import { API_URLS } from "@Definitions";
import axios from "axios";

export const sayHello = businessSlugParam => {
    const { buildUrl } = API_URLS;
    const url = buildUrl("BUSINESS", { businessSlug: businessSlugParam });
    return axios
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(() => {
            return null;
        });
};

export const syncContacts = contacts => {
    const { buildUrl } = API_URLS;
    const url = buildUrl("BUSINESS", { businessSlug: contacts });

    return axios
        .post(url, { contacts })
        .then(response => {
            return response.data;
        })
        .catch(error => {});
};
