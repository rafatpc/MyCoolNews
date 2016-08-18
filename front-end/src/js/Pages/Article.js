import React from "react";
import Loading from "../Components/Loading";
import ArticlesStore from "../Stores/Articles";
import ArticleFull from "../Components/Article/Full";

export default class Article extends React.Component {
    constructor(props) {
        super(props);

        ArticlesStore.getById(props.params.id);

        this.state = {
            article: <Loading />
        };

        this.displayArticle = this.displayArticle.bind(this);
    }

    componentWillMount() {
        ArticlesStore.once("ARTICLE_RECEIVED", this.displayArticle);
    }

    componentWillUnmount() {
        // ArticlesStore.removeListener("ARTICLE_RECEIVED", this.displayArticle);
    }

    displayArticle(data) {
        this.setState({
            article: <ArticleFull key={data.id} data={data} />
        });
    }

    render() {
        return (
            <div class="col-xs-12">
                {this.state.article}
            </div>
        );
    }
}
