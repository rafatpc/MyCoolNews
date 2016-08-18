import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRedirect, hashHistory } from "react-router";

// import Bootstrap from "./Libs/bootstrap-without-jquery";

import getValue from "./Helpers/Functions";

import Article from "./Pages/Article";
import Articles from "./Pages/Articles";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import Settings from "./Pages/Settings";
import SignUp from "./Pages/SignUp";

const app = document.getElementById('app');
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRedirect to="/articles" />
            <Route path="articles" component={Articles} />
            <Route path="articles/page/:page" component={Articles} />
            <Route path="articles/:id/:title" component={Article} />
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
            <Route path="settings" component={Settings} />
            <Route path="signup" component={SignUp} />
        </Route>
    </Router>,
app);
