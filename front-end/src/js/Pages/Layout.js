import React from "react";
import NavBar from "../Components/Navigation/NavBar";
import HttpRequest from "../Helpers/HttpRequest";
import UserStore from "../Stores/User";

export default class Layout extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: false
        };

        this.userStatusHandler = this.userStatusHandler.bind(this);
    }

    userStatusHandler(data) {
        this.setState({
            isLoggedIn: data.isLoggedIn
        });
    }

    componentWillMount() {
        UserStore.on("USER_STATUS_UPDATE", this.userStatusHandler);
    }

    componentWillUnmount() {
        UserStore.removeListener("USER_STATUS_UPDATE", this.userStatusHandler);
    }

    render() {
        return (
            <div>
                <NavBar activeUser={this.state.isLoggedIn} />
                {this.props.children}
            </div>
        );
    }
}
