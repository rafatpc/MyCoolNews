import React from "react";

export default class EventComponent extends React.Component {
    constructor() {
        super();
    }

    setStore(store) {
        this.store = store;
    }

    setListeners(obj) {
        this.listeners = obj;
    }

    iterateListeners(fnc) {
        for (var listener in this.listeners) {
            let handler = this.listeners[listener];

            fnc(listener, handler);
        }
    }

    componentWillMount() {
        this.iterateListeners(this.store.on);
    }

    componentWillUnmount() {
        this.iterateListeners(this.store.removeListener);
    }
}
