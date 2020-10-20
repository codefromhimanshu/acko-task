// #region Global Imports
import next from "next";
import express from "express";
import path from "path";
import nextI18NextMiddleware from "next-i18next/middleware";
// #endregion Global Imports

// #region Local Imports
import nextI18next from "./i18n";
import routes from "./routes";
import proxy from "./proxy";
// #endregion Local Imports

const port = parseInt(process.env.PORT || "8080", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express();

    app.setAssetPrefix(process.env.STATIC_PATH);
    server.use(express.static(path.join(__dirname, "../public/static")));
    server.use(nextI18NextMiddleware(nextI18next));

    // if (process.env.PROXY_MODE === "local") {
    //     // eslint-disable-next-line global-require
    //     const { createProxyMiddleware } = require("http-proxy-middleware");
    //     const devProxy = proxy(process.env.API_URL || "");

    //     Object.keys(devProxy).forEach(context => {
    //         server.use(
    //             context,
    //             createProxyMiddleware(context, devProxy[context])
    //         );
    //     });
    // }

    server.get("*", (req, res) => handler(req, res));

    server.listen(port);

    // eslint-disable-next-line no-console
    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? "development" : process.env.NODE_ENV
        }`
    );
});
