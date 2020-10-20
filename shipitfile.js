const pack = require("./package.json");
const request = require("request");

const { name } = pack;
const brIdx = process.argv.indexOf("-b");
const branch =
    process.argv.slice(brIdx, brIdx + 2)[1] ||
    process.env.CI_COMMIT_REF_NAME ||
    require("git-branch").sync() ||
    "master";

console.log("Deploying Branch:", branch);
module.exports = function(shipit) {
    require("shipit-deploy")(shipit);
    require("shipit-shared")(shipit);

    const webhookUrl =
        "https://hooks.slack.com/services/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";
    shipit.initConfig({
        default: {
            shared: {
                overwrite: true,
                files: [".env"],
            },
            workspace: `/tmp/${name}`,
            repositoryUrl: "git@vault.anar.biz:anar-app/anar-mweb.git",
            ignores: [
                ".git",
                "node_modules",
                ".DS_Store",
                "yarn-error.log",
                "coverage",
            ],
            branch,
            keepReleases: 5,
            deleteOnRollback: false,
            shallowClone: true,
        },
        staging: {
            // servers: "ubuntu@staging-mweb2.anar.biz"
            servers: "ubuntu@localhost:2201",
            deployTo: "/home/ubuntu/projects/staging-mweb",
            // servers: "ubuntu@172.31.11.62"
        },
        production: {
            servers: "ubuntu@localhost:2201",
            deployTo: "/home/ubuntu/projects/production-mweb",
        },
    });
    shipit.on("updated", function() {
        shipit.start("build");
    });
    shipit.blTask("build", function() {
        const env = shipit.environment;
        const port = shipit.environment === "staging" ? 8080 : 8090;

        return shipit.remote(
            `cd ${shipit.releasePath} && PORT=${port}
        npm install &&
        npm run build &&
          (/home/ubuntu/.yarn/bin/pm2 restart ${shipit.environment}-mweb ||
            /home/ubuntu/.yarn/bin/pm2 start yarn --name "${env}-mweb" --interpreter bash -- start
          )`
        );
    });
    shipit.on("published", function() {
        shipit.start("post-publish");
    });
    shipit.task("post-publish", ["notify"]);
    shipit.blTask("notify", function(cb) {
        if (!webhookUrl) {
            return cb();
        }
        shipit.local("git config user.name", {}).then(function(res) {
            request(
                {
                    method: "POST",
                    uri: webhookUrl,
                    json: true,
                    body: {
                        channel: "deployment-alerts",
                        username: res.stdout,
                        text: `${name}, branch -> ${branch} - Deployed to ${shipit.environment} by ${res.stdout}\n`,
                    },
                },
                function(error, response, body) {
                    if (error) {
                        return console.error("upload failed:", error);
                    }
                    console.log(
                        "Upload successful!  Server responded with:",
                        body
                    );
                    return cb();
                }
            );
        });
    });
};
