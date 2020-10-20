export default (API_URL: string) => {
    const devProxy: { [key: string]: {} } = {
        "/api": {
            target: API_URL,
            pathRewrite: { "^/api": "/api" },
            changeOrigin: true,
        },
    };
    return devProxy;
};
