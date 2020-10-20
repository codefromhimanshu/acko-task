import React from "react";
import { imagePaths } from "@Definitions";

export const Loader: React.FunctionComponent = () => {
    return <img src={imagePaths.LOADER} alt="loader" className="mx-auto" />;
};
