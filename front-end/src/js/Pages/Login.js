import React from "react";
import HttpData from "../Helpers/HttpData";
import HttpRequest from "../Helpers/HttpRequest";
import UserStore from "../Stores/User";
import Validator from "../Helpers/Validator";
import Dispatcher from "../Helpers/Dispatcher";

export default class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            username: localStorage.getItem('user'),
            password: null,
            remember: false,
            error: [],
            allowRequest: true
        };

        this.userStatusHandler = this.userStatusHandler.bind(this);
    }

    componentWillMount() {
        UserStore.on("USER_STATUS_UPDATE", this.userStatusHandler);

        this.userStatusHandler({
            isLoggedIn: UserStore.isLoggedIn()
        });
    }

    componentWillUnmount() {
        UserStore.removeListener("USER_STATUS_UPDATE", this.userStatusHandler);
    }

    userStatusHandler(data) {
        if (data.isLoggedIn) {
            let { router } = this.context;
            router.push('/');
        }
    }

    onClickLogin(e) {
        let { username, password, remember } = this.state;
        let displayError = Validator.displayError.bind(this);

        this.setState({
            error: [],
            allowRequest: true
        });

        if (remember === 'on') {
            localStorage.removeItem('user');
            localStorage.setItem('user', username);
        }

        if (!Validator.username(username)) {
            displayError("Invalid username!");
        }

        if (!Validator.password(password)) {
            displayError("Invalid password!");
        }

        if (!this.state.allowRequest) {
            return;
        }

        new HttpRequest(
            "//api.mycool.news/login",
            "POST",
            this.onResponseLogin.bind(this),
            HttpData({
                username,
                password
            })
        );

        e.preventDefault();
    }

    onResponseLogin(loginResponse) {
        if (loginResponse.data.loggedIn) {
            Dispatcher.dispatch({
                type: "UPDATE_USER_STATUS"
            });
        } else {
            this.displayError(loginResponse.data.error);
        }
    }

    onChangeInput(e) {
        let { target } = e;
        let { type } = target.dataset;
        let state = {};

        state[type] = target.value;
        this.setState(state);
    }

    render() {
        let onChangeInput = this.onChangeInput.bind(this);

        return (
            <div class="container">
                {this.state.error}
                <form>
                    <fieldset>
                        <div class="form-group">
                            <label for="inputEmail" class="col-xs-12 control-label">Username</label>
                            <div class="col-xs-12">
                                <input type="text" class="form-control" onChange={onChangeInput} data-type="username" value={this.state.username} placeholder="Username" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputPassword" class="col-xs-12 control-label">Password</label>
                            <div class="col-xs-12">
                                <input type="password" class="form-control" onChange={onChangeInput} data-type="password" placeholder="Password" />
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" onChange={onChangeInput} data-type="remember" /> Remember my username
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <button type="submit" class="btn btn-primary" onClick={this.onClickLogin.bind(this)}>Login</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
}
