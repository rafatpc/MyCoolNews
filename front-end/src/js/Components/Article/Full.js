import React from "react";

import ArticleContent from "./Content";
import ArticleImage from "./Image";
import ArticleInfo from "./Info";
import ArticleTitle from "./Title";

export default class ArticleFull extends React.Component {
    render() {
        let data = this.props.data;

        return (
            <div class="article-preview">
                <ArticleTitle title={data.title} />
                <ArticleInfo author={data.author.name} date={data.date} />
                <ArticleImage url={data.image} />
                <br />
                <ArticleContent text={data.text} />
            </div>
        );
    }
}
