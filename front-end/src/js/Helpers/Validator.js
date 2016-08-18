import React from "react";

const Validator = {
    username: function(username) {
        return username !== null && /^[A-Za-z0-9_-]{4,15}$/.test(username);
    },

    password: function(password) {
        return password !== null && /^[^ ]{4,15}$/.test(password);
    },

    passwordMatch: function(password, repassword) {
        return password === repassword;
    },

    email: function(email) {
        return email !== null && /^([A-Za-z0-9._]{4,})@([A-Za-z0-9_]{2,}\.\w{2,6})$/.test(email);
    },

    name: function(name) {
        return name !== null && /^(\w+ ?){2,4}$/.test(name);
    },

    displayError: function(message) {
        let node = <div class="alert alert-danger" key={Date.now()}><strong>Error</strong> {message}</div>;
        let error = this.state.error;
        error.push(node);

        this.setState({
            error
        });

        setTimeout(() => {
            let error = this.state.error;
            error.splice(error.indexOf(node), 1);

            this.setState({
                error
            });
        }, 3000)
    }
}

export default Validator;
