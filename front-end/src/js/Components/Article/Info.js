import React from "react";

export default class ArticleInfo extends React.Component {
    render() {
        let date = new Date(parseInt(this.props.date) * 1000);

        return (
            <small class="article-preview-info">
                By {this.props.author} | {date.toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s(\d+):(\d+).*/,'$2/$1/$3 $4:$5')}
            </small>
        );
    }
}
