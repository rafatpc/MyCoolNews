import React from "react";

export default class ArticleTitle extends React.Component {
    render() {
        return (
            <h3 class="article-preview-title">{this.props.title}</h3>
        );
    }
}
