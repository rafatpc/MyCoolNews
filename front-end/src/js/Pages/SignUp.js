import React from "react";
import HttpRequest from "../Helpers/HttpRequest";
import UserStore from "../Stores/User";
import Dispatcher from "../Helpers/Dispatcher";
import Validator from "../Helpers/Validator";
import { getNodeByData } from "../Helpers/Functions";

export default class SignUp extends React.Component {
    constructor() {
        super();

        // this.state = {
        //     username: null,
        //     email: null,
        //     password: null,
        //     repassword: null
        // };

        let timeStamp = (Date.now() + "").substr(-4, 4);

        this.state = {
            username: 'test' + timeStamp,
            name: 'Test',
            email: 'test' + timeStamp + '@abv.bg',
            password: 'testing1',
            repassword: 'testing1',
            error: []
        };


        this.onClickRegister = this.onClickRegister.bind(this);
        window.sus = this;
    }

    onChangeInput(e) {
        let { target } = e;
        let { type } = target.dataset;
        let state = {};

        state[type] = target.value;
        this.setState(state);
    }

    onClickRegister(e) {
        e.preventDefault();
        this.registerButton = e.target;
        this.registerButton.disabled = "disabled"

        let { username, name, email, password, repassword } = this.state;
        let displayError = Validator.displayError.bind(this);

        if (!Validator.username(username)) {
            displayError("Invalid username!");
        }

        if (!Validator.password(password)) {
            displayError("Invalid password!");
        }

        if (!Validator.passwordMatch(password, repassword)) {
            displayError("Passwords didn't match!");
        }

        if (!Validator.email(email)) {
            displayError("Invalid email!");
        }

        if (!Validator.name(name)) {
            displayError("Invalid name!");
        }

        if (this.state.error.length !== 0) {
            setTimeout(() => {
                this.registerButton.disabled = "";
            }, 3000);
            return;
        }

        new HttpRequest(
            "//api.mycool.news/register",
            "POST",
            this.onResponseRegister.bind(this),
            {
                username,
                name,
                email,
                password,
                repassword
            }
        );
    }

    onResponseRegister(response) {
        this.registerButton.disabled = "";
        let displayError = Validator.displayError.bind(this);

        if (!response.success) {
            displayError(response.data.error);
        } else {
            Dispatcher.dispatch({
                type: "UPDATE_USER_STATUS"
            });
            this.context.router.push('/');
        }
    }

    componentWillMount() {
        if (UserStore.isLoggedIn()) {
            this.context.router.push('/');
        }
    }

    render() {
        let onChangeInput = this.onChangeInput.bind(this);

        return (
            <div class="container signup-form">
                {this.state.error}
                <form>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-xs-12 control-label sr-only">Username</label>
                            <div class="col-xs-12">
                                <input type="text" class="form-control" onChange={onChangeInput} data-type="username" placeholder="Username" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 control-label sr-only">Email</label>
                            <div class="col-xs-12">
                                <input type="text" class="form-control" onChange={onChangeInput} data-type="email" placeholder="Email" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 control-label sr-only">Password</label>
                            <div class="col-xs-12">
                                <input type="password" class="form-control" onChange={onChangeInput} data-type="password" placeholder="Password" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-12 control-label sr-only">Repeat Password</label>
                            <div class="col-xs-12">
                                <input type="password" class="form-control" onChange={onChangeInput} data-type="repassword" placeholder="Repeat Password" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <button type="submit" class="btn btn-primary" onClick={this.onClickRegister}>Register</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

SignUp.contextTypes = {
    router: React.PropTypes.object
}
