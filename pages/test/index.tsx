// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from "@Server/i18n";
import { Layout } from "@Components";

// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports
const Test: NextPage<undefined, undefined> = () => {
    return (
        <Layout whatsappNumber="">
            <section />
        </Layout>
    );
};

export default withTranslation("common")(Test);
