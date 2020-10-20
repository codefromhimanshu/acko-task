import { parse } from "uritemplate";

import getConfig from "next/config";

const {
    publicRuntimeConfig: { API_URL },
} = getConfig();
const BASE_URL: string = `${API_URL}`;

const makeQueryParam = (queryParamMap: any = {}) => {
    let string = "?";
    let paramList;
    let index;
    if (queryParamMap) {
        Object.keys(queryParamMap).forEach(key => {
            if (queryParamMap[key].constructor === Array) {
                paramList = queryParamMap[key];
                index = paramList.length;
                while (index) {
                    index -= 1;
                    string += `${key}[]=${paramList[index]}&`;
                }
            } else {
                string += `${key}=${queryParamMap[key]}&`;
            }
        });
    }
    return string;
};
export const API_URLS: { [key: string]: any } = {
    ISSUES: `${BASE_URL}/search/issues`,
    ISSUE: `${BASE_URL}/repos/{org}/{repo}/issues/{issueId}`,
    buildUrl(urlName: string, params?: {}, queryParam?: any): string {
        return (
            parse(API_URLS[urlName]).expand(params || {}) +
            makeQueryParam(queryParam)
        );
    },
};
