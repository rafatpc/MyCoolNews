import Dispatcher from "../Helpers/Dispatcher";

export function createArticle(data) {
    Dispatcher.dispatch({
        type: "CREATE_ARTICLE",
        data
    });
}

export function deleteArticle(id) {
    Dispatcher.dispatch({
        type: "DELETE_ARTICLE",
        id
    });
}

export function editArticle(data, id) {
    Dispatcher.dispatch({
        type: "DELETE_ARTICLE",
        data,
        id
    });
}
