import React from "react";
import { Link } from "react-router";
import SlugMaker from "../../Helpers/SlugMaker";

import ArticleContent from "./Content";
import ArticleImage from "./Image";
import ArticleInfo from "./Info";
import ArticleTitle from "./Title";

export default class ArticlePreview extends React.Component {
    render() {
        let { id, title, author, date, image, text } = this.props.data;
        let route = "articles/" + id + "/" + SlugMaker(title);
        let debugTitle = "[" + id+ "] " + title;
        return (
            <div class="article-preview">
                <Link to={route}>
                    <ArticleTitle title={debugTitle} />
                </Link>
                <ArticleInfo author={author.name} date={date} />
                <Link to={route}>
                    <ArticleImage url={image} />
                </Link>
                <ArticleContent text={text} substr="130" />
            </div>
        );
    }
}
