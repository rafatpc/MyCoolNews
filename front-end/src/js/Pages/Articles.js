import React from "react";
import ArticlesStore from "../Stores/Articles";
import ArticlePreview from "../Components/Article/Preview";
import ArticleFilters from "../Components/Article/Filters";
import Loading from "../Components/Loading";
import Pagination from "../Components/Pagination";

export default class Articles extends React.Component {
    constructor(props) {
        super(props);

        let page = props.params.page || 1;

        this.onReceivedArticles = this.onReceivedArticles.bind(this);
        this.state = {
            articles: <Loading />,
            pagination: '',
            perPage: 3,
            currentPage: page
        }

        ArticlesStore.on("ARTICLES_RECEIVED", this.onReceivedArticles);
        ArticlesStore.getPage(page);
    }

    componentWillUnmount() {
        ArticlesStore.removeListener("ARTICLES_RECEIVED", this.onReceivedArticles);
    }

    onReceivedArticles(data, total) {
        let pagination = <Pagination total={total}
                                     currentPage={this.state.currentPage}
                                     perPage={this.state.perPage}
                                     onNavigate={this.onPageChanged.bind(this)}
                                     route="#/articles/page/"
                                     key={"pagination_" + this.state.currentPage} />;

        this.setState({
            articles: data.map(this.mapArticlesData),
            pagination
        });
    }

    mapArticlesData(article, index) {
        return(
            <ArticlePreview key={article.id} data={article} index={index} />
        );
    }

    onPageChanged(page) {
        this.setState({
            currentPage: page
        });
        ArticlesStore.getPage(page);
    }

    onFiltersCleared() {
        this.onPageChanged(1);
        this.context.router.push('/articles/page/1');
    }

    render() {
        return (
            <div>
                <div class="col-xs-8">
                    <div>{this.state.articles}</div>
                    <div>{this.state.pagination}</div>
                </div>
                <div class="col-xs-4">
                    <ArticleFilters onClearFilters={this.onFiltersCleared.bind(this)} />
                </div>
            </div>
        );
    }
}

Articles.contextTypes = {
    router: React.PropTypes.object
}
