import * as React from "react";

import { Footer } from "@Components";
import { LayoutProps } from "./Layout";
import "./style.scss";

const Layout: React.FunctionComponent<LayoutProps> = (props): JSX.Element => {
    const { children } = props;
    return (
        <div className="layout overflow-auto w-full min-h-screen">
            {children}
            <Footer />
        </div>
    );
};

export { Layout };
