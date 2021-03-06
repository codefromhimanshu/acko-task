// #region Global Imports
import * as React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import withRedux from "next-redux-wrapper";
// #endregion Global Imports

// #region Local Imports
import { theme } from "@Definitions/Styled";
import { appWithTranslation } from "@Server/i18n";
import { AppWithStore } from "@Interfaces";
import { makeStore } from "@Redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "@Static/css/main.scss";
// #endregion Local Imports

class WebApp extends App<AppWithStore> {
    componentDidMount() {}

    static async getInitialProps({
        Component,
        ctx,
    }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;

        const persistor = persistStore(store);
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        );
    }
}

export default withRedux(makeStore)(appWithTranslation(WebApp));
