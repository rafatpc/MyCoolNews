import React from "react";
import { Link } from "react-router";

export default class NavLink extends React.Component {
    render() {
        let { route, title } = this.props,
            isActive = this.context.router.isActive(route, true),
            isArticles = window.location.hash.indexOf('articles') !== -1,
            className = isActive || (isArticles && route.indexOf('articles') !== -1) ? "active" : "";

        return (
            <li class={className}>
                <Link to={route}>{title}</Link>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object
}
