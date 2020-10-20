/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./styles.scss";
import Router from "next/router";
import { getIssues } from "@Actions";
import { Footer } from "@Components";
import debounce from "lodash.debounce";

class IssuesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            title: "facebook/react",
            total_count: 11,
            page: 1,
            per_page: 10,
            isLoading: false,
            search: "",
        };
        this.onSearch = this.onSearch.bind(this);
        this.loadIssues = this.loadIssues.bind(this);
        // Binds our scroll event handler
        window.onscroll = debounce(() => {
            const {
                loadIssues,
                state: { error, isLoading, total_count, page, per_page },
            } = this;

            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (error || isLoading || total_count < page * per_page) return;

            // Checks that the page has scrolled to the bottom
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                loadIssues();
            }
        }, 100);
    }

    componentDidMount() {
        this.loadIssues();
    }

    getDateFn(date) {
        const timestamp = new Date(date);
        return `${timestamp.getDate()}-${timestamp.getMonth()}-${timestamp.getFullYear()}`;
    }

    onSearch(event) {
        this.setState(
            {
                page: 1,
                per_page: 10,
                total_count: 11,
                search: event.target.value,
            },
            () => {
                this.loadIssues();
            }
        );
    }

    loadIssues() {
        const { issues, page, search, title } = this.state;
        this.setState({ isLoading: true });
        getIssues(encodeURIComponent(`${search} repo:${title}`), page).then(
            res => {
                console.log(res);
                this.setState({
                    issues: [...issues, ...res.items],
                    total_count: res.total_count,
                    isLoading: false,
                    page: page + 1,
                });
            }
        );
    }

    render() {
        const { issues, title } = this.state;
        return (
            <div className="container">
                <div className="row ">
                    <h2>{title}</h2>
                    <div className="container-fluid">
                        <input
                            className="search-input"
                            type="text"
                            name="search"
                            placeholder="Search for a issue"
                            onChange={this.onSearch}
                        />
                        <ul className="list-group">
                            {issues.map(i => {
                                return (
                                    <li className="list-group-item">
                                        # 
{' '}
{i.number}
                                        <a href={`/issues/${i.number}`}>
                                            &nbsp;
                                            {i.title}
                                        </a>
                                        <br />
                                        by &nbsp;
                                        {i.user?.login}
                                        <span className="text-right">
                                            &nbsp;
                                            {this.getDateFn(i.created_at)}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default IssuesPage;
