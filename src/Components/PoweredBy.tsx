import React from "react";
import { imagePaths } from "@Definitions/Constants";

export const PoweredBy: React.FunctionComponent = () => {
    return (
        <div className="h-48 py-5 bg-white">
            <p className="text-xs leading-3 text-center mb-3">Powered by</p>
            <div className="mx-auto table mb-5">
                <img
                    src={imagePaths.ANAR_LOGO}
                    className="float-left mr-2"
                    alt="anarLogo"
                />
                <div className="float-right">
                    <p className="text-sm font-black leading-5 text-black">
                        B2B Business Network
                    </p>
                    <p className="font-medium text-sm leading-5">
                        <span className="float-left">आत्मनिर्भर भारत</span>
                        <img
                            src={imagePaths.FLAG_ICON}
                            className="float-left h-5 px-1"
                            alt="flag icon"
                        />
                        के लिए
                    </p>
                </div>
            </div>
            <a
                href="https://play.google.com/store/apps/details?id=biz.anar&referrer=anarMweb"
                target="_blank"
                rel="noreferrer"
            >
                <button
                    className="bg-transparent text-blue-600 border border-blue-500 text-sm font-semibold px-4 py-2 rounded block mx-auto"
                    type="button"
                >
                    <img
                        src={imagePaths.ANDROID_ICON}
                        className="float-left mr-3"
                        alt="android icon"
                    />
                    <p className="float-right font-semibold text-sm">
                        Download the App
                    </p>
                </button>
            </a>
        </div>
    );
};
