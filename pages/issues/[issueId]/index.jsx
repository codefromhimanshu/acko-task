/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./styles.scss";
import Router from "next/router";
import { getIssueDetail } from "@Actions";
import { Footer } from "@Components";

class IssueDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "facebook/react",
        };
    }

    static async getInitialProps(ctx) {
        const { issueId } = ctx.query;
        const issueDetail = await getIssueDetail(issueId);

        return {
            issueDetail,
        };
    }

    getDateFn(date) {
        const timestamp = new Date(date);
        return `${timestamp.getDate()}-${timestamp.getMonth()}-${timestamp.getFullYear()}`;
    }

    render() {
        const { title } = this.state;
        const { issueDetail } = this.props;
        return (
            <div className="container">
                <div className="row ">
                    <h2>{title}</h2>

                    <div className="container">
                        <div>
                            <h4 className="issue-title">{issueDetail.title}</h4>
                            <div className="issue-status">
                                {issueDetail.status}
                            </div>
                            <div className="row">
                                <div className="issue-user col-8">
                                    {issueDetail.user.login}
                                </div>

                                <div className="issue-created_at col-4">
                                    {this.getDateFn(issueDetail.created_at)}
                                </div>

                                <div className=" col-12 label">
                                    {issueDetail.labels.map(l => {
                                        return (
                                            <button
                                                type="button"
                                                style={{
                                                    backgroundColor: `#${l.color}`,
                                                }}
                                            >
                                                {l.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div
                                className="issue-body"
                                dangerouslySetInnerHTML={{
                                    __html: issueDetail.body,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IssueDetailPage;
