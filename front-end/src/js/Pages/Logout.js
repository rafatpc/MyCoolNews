import React from "react";
import Dispatcher from "../Helpers/Dispatcher";
import HttpRequest from "../Helpers/HttpRequest";
import UserStore from "../Stores/User";

export default class Logout extends React.Component {
    constructor() {
        super();

        new HttpRequest(
            "//api.mycool.news/logout",
            "GET",
            () => {
                Dispatcher.dispatch({
                    type: "UPDATE_USER_STATUS"
                });
            }
        );
    }

    componentWillMount() {
        this.context.router.push('/');
    }

    render() {
        return(null);
    }
}

Logout.contextTypes = {
    router: React.PropTypes.object
}
