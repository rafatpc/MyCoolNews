import React from "react";
import UserStore from "../Stores/User";

export default class Settings extends React.Component {
    componentWillMount() {
        const { router } = this.context;

        if (!UserStore.isLoggedIn()) {
            router.push('/login');
        }
    }

    render() {
        return(
            <h2>Settings :)</h2>
        );
    }
}

Settings.contextTypes = {
    router: React.PropTypes.object
}
