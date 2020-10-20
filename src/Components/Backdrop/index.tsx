import React from "react";
import { IBackdropProps } from "./Backdrop";
import "./style.scss";

export const Backdrop: React.FunctionComponent<IBackdropProps> = props => {
    return (
        <div
            className="backdrop top-0 bottom-0 w-full h-full z-30 fixed cursor-pointer"
            onClick={e => {
                e.stopPropagation();
                props.closeBackDrop();
            }}
            role="presentation"
        />
    );
};
