import React from "react";
import { useRouter } from "next/router";
import { imagePaths } from "@Definitions";
import { connect } from "react-redux";
import { IStore } from "@Interfaces";
import { IBottomNavigationProps } from "./BottomNavigation";

const BottomNavigationUnConnected: React.FunctionComponent<IBottomNavigationProps> = props => {
    const router = useRouter();

    const path = router.pathname.split("/");

    return (
        <div className="flex justify-between w-full px-8 pt-2 bg-white py-4 border-t z-20" />
    );
};

const mapStateToProps = (store: IStore) => {
    return {
        order: store.order,
    };
};

export const BottomNavigation = connect(mapStateToProps)(
    BottomNavigationUnConnected
);
