// #region Global Imports
import * as React from "react";
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
// #endregion Global Imports

import getConfig from "next/config";
import { SEO_META } from "@Definitions";
import { ISEOTemplate } from "@Interfaces";

import "@Utils/string.extensions";

const {
    publicRuntimeConfig: { GA_ID, GTM_ID },
} = getConfig();

class WebAppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        const { __NEXT_DATA__ } = this.props;

        // const {
        //     seoData,
        // }: {
        //     seoData: any;
        // } = __NEXT_DATA__?.props?.initialProps?.pageProps;

        // const templateAbstract = SEO_META[seoData?.path];

        const templateValues: ISEOTemplate = {
            description: "Page Not Found",
            title: "Page Not Found",
            image: "",
            keywords: "Page Not Found, Anar",
        };

        // if (seoData) {
        //     Object.keys(templateAbstract).map(param => {
        //         templateValues[param] = templateAbstract[param].interpolate({
        //             ...seoData,
        //         });
        //         return null;
        //     });
        // }
        return (
            <Html>
                <Head>
                    <meta name="theme-color" content="#000000" />
                    <meta charSet="UTF-8" />
                    <meta name="robots" content="index, follow" />
                    <meta
                        name="description"
                        content={templateValues.description}
                    />
                    <meta name="language" content="English" />
                    <meta
                        httpEquiv="Content-Type"
                        content="text/html; charset=utf-8"
                    />
                    <meta name="keywords" content={templateValues.keywords} />
                    <meta name="title" content={templateValues.title} />
                    <meta
                        name="viewport"
                        content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                    />
                    <meta content="object" property="og:type" />
                    <meta content={templateValues.title} property="og:title" />
                    <meta
                        content={templateValues.description}
                        property="og:description"
                    />
                    <meta content={templateValues.image} property="og:image" />
                    <meta content="summary" property="twitter:card" />
                    <title>{templateValues.title}</title>
                    <link
                        rel="shortcut icon"
                        href="/static/images/favicon.ico"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebAppDocument;
