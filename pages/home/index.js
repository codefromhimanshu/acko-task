/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./styles.scss";
import Router from "next/router";

import {
    Footer,
} from "@Components";
class LandingPage extends React.Component {
    static async getInitialProps(ctx) {
        // const { businessSlug } = ctx.query;
        const seoData = {
            path: "home",
            width: 500,
            height: 500,
        };
        return {
            seoData,
        };
    }

    render() {
        return (
            <div class="container">
                <div class="row red">
                    <div class="col-sm">One of three columns</div>
                    <div class="col-sm">two of three columns</div>
                    <div class="col-sm">three of three columns</div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default LandingPage;
