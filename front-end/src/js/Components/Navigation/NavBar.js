import React from "react";
import NavLink from "./NavLink";
import HttpRequest from "../../Helpers/HttpRequest";

export default class NavBar extends React.Component {
    constructor() {
        super();
        this.getNavigationLinks();

        this.state = {
            collapsed: true,
            leftLinks: {},
            rightLinks: {},
            rightLinksActiveUser: {},
            title: "",
        };
    }

    getNavigationLinks() {
        new HttpRequest(
            "//api.mycool.news/navigation",
            "GET",
            (links) => {
                this.setState(links.data || {})
            }
        );
    }

    getLinksComponents(links) {
        var components = [];

        for (var route in links) {
            components.push(<NavLink key={route} title={links[route]} route={route} />);
        }

        return components;
    }

    collapseNavBar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <nav class="navbar navbar-default navbar-static-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" onClick={this.collapseNavBar.bind(this)}>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">{this.state.title}</a>
                    </div>

                    <div class={this.state.collapsed ? 'navbar-collapse collapse' : 'navbar-collapse'}>
                        <ul class="nav navbar-nav">{this.getLinksComponents(this.state.leftLinks)}</ul>
                        <ul class="nav navbar-nav navbar-right">{this.getLinksComponents(this.props.activeUser ? this.state.rightLinksActiveUser : this.state.rightLinks)}</ul>
                    </div>
                </div>
            </nav>
        );
    }
}
