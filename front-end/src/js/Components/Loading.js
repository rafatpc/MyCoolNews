import React from "react";

export default class Loading extends React.Component {
    render() {
        return (
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
                <small class="text-muted">Loading</small>
            </div>
        );
    }
}
