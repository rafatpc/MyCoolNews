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
        switch (action.type) {
            case "UPDATE_USER_STATUS":
                this.updateUserState();
            break;
        }

        console.log("Action", action.type, "received", action);
    }
}

const userStore = new UserStore();

window.userStore = userStore;

Dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;
