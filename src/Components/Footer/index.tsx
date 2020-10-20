// #region Global Imports
import * as React from "react";
// #endregion Global Imports

// #region Local Imports
import {} from "@Components";
import { IFooter } from "./Footer";
import "./style.scss";
// #endregion Local Imports
const Footer: React.FunctionComponent<IFooter.IProps> = (
    props
): JSX.Element => {
    return (
        <div>
            <div className=" mb-48 mt-10px">{/* <PoweredBy /> */}</div>
        </div>
    );
};

export { Footer };
