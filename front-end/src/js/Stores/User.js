import { EventEmitter } from "events";
import HttpRequest from "../Helpers/HttpRequest";
import Dispatcher from "../Helpers/Dispatcher";

class UserStore extends EventEmitter {
    constructor() {
        super();
        this.loggedIn = false;
        this.user = {};
        this.updateUserState();
    }

    updateUserState() {
        new HttpRequest(
            "//api.mycool.news/users/status",
            "GET",
            this.onReceivedUserStatus.bind(this)
        );
    }

    onReceivedUserStatus(userStatusResponse) {
        this.loggedIn = (userStatusResponse || {data: {isLoggedIn: false}}).data.isLoggedIn;

        this.emit("USER_STATUS_UPDATE", {
            isLoggedIn: this.loggedIn
        });
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    handleActions(action) {
        let actions = {
            UPDATE_USER_STATUS: this.updateUserState
        }

        if (actions.hasOwnProperty(action.type)) {
            console.log("[User Store] Action", action.type, "executed", action);
            actions[action.type](action.payload);
        }
    }
}

const userStore = new UserStore();
Dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
