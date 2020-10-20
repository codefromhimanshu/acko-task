// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from "@Server/i18n";
import { imagePaths } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IErrorPage } from "@Interfaces";
// #endregion Interface Imports

const Error: NextPage<IErrorPage.IProps, IErrorPage.InitialProps> = () => {
    return (
        <section className="top-0 left-0 min-h-screen min-w-full relative">
            <div className="flex h-full items-center absolute w-full">
                <div className="mx-auto text-center">
                    <img
                        src={imagePaths.ERROR_GIF}
                        className="mx-auto"
                        alt="ERROR_404"
                    />
                    <p className="font-black text-xl leading-normal">
                        Sorry, Page not found!
                    </p>
                </div>
            </div>
        </section>
    );
};

Error.getInitialProps = async ({ res, err }) => {
    let statusCode;

    if (res) {
        ({ statusCode } = res);
    } else if (err) {
        ({ statusCode } = err);
    }

    return {
        namespacesRequired: ["common"],
        statusCode,
    };
};

export default withTranslation("common")(Error);
