import React from "react";

export default class ArticleImage extends React.Component {
    render() {
        let previewImage = {
            backgroundImage: "url(" + this.props.url + ")"
        }

        return (
            <div class="article-preview-image" style={previewImage}></div>
        );
    }
}
