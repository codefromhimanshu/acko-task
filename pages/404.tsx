// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
// #endregion Global Imports

// #region Local Imports
import { imagePaths } from "@Definitions";
// #endregion Local Imports

// #region Interface Imports
import { IHomePages } from "@Interfaces";
// #endregion Interface Imports

const NotFound: NextPage<IHomePage.IProps> = () => {
    return (
        <section className=" top-0 left-0 min-h-screen min-w-full relative">
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

export default NotFound;
