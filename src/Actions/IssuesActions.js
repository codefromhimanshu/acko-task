import { API_URLS } from "@Definitions";
import axios from "axios";

export const getIssues = (q = "repo:facebook/react", page = 1) => {
    const { buildUrl } = API_URLS;
    const url = buildUrl("ISSUES", {}, { q, page });
    console.log(url, q, page);
    return axios
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
};

export const getIssueDetail = (
    issueId = "19910",
    repoName = "facebook/react"
) => {
    const { buildUrl } = API_URLS;
    const org = repoName.split("/")[0];
    const repo = repoName.split("/")[1];
    const url = buildUrl("ISSUE", { org, repo, issueId });
    console.log(url);
    return axios
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return null;
        });
};
