import { EventEmitter } from "events";
import HttpRequest from "../Helpers/HttpRequest";
import Dispatcher from "../Helpers/Dispatcher";

class ArticlesStore extends EventEmitter {
    constructor() {
        super();
        this.articles = [];
        this.filters = {};
    }

    getAll() {
        return this.articles;
    }

    getArticles() {
        new HttpRequest(
            "//api.mycool.news/articles",
            "GET",
            this.onReceivedArticles.bind(this)
        );
    }

    getById(id) {
        new HttpRequest(
            "//api.mycool.news/articles/" + id,
            "GET",
            this.onReceivedArticle.bind(this)
        );
    }

    getPage(page) {
        new HttpRequest(
            "//api.mycool.news/articles/page/" + page,
            "GET",
            this.onReceivedArticles.bind(this)
        );
    }

    clearFilters() {

    }

    filter(params) {
        // this.filters
        debugger;

    }

    onReceivedArticles(articlesResponse) {
        let articlesArray = articlesResponse.data;

        this.articles = articlesArray;
        this.emit("ARTICLES_RECEIVED", articlesArray, articlesResponse.total);
    }

    onReceivedArticle(articleResponse) {
        let article = (articleResponse.data || [{}])[0];
        this.emit("ARTICLE_RECEIVED", article);
    }

    handleActions(action) {
        let actions = {
            ARTICLES_FILTERS: this.filter.bind(this),
            ARTICLES_CLEAR_FILTERS: this.clearFilters.bind(this),
            PAGINATION_PAGE_CHANGED: this.changePage.bind(this)
        }

        if (actions.hasOwnProperty(action.type)) {
            console.log("[Articles Store] Action", action.type, "executed", action);
            actions[action.type](action.payload);
        }
    }
}

const articlesStore = new ArticlesStore();

window.articlesStore = articlesStore;
window.dispatcher = Dispatcher;

Dispatcher.register(articlesStore.handleActions.bind(articlesStore));
export default articlesStore;
