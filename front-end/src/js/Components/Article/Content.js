import React from "react";

export default class ArticleContent extends React.Component {
    render() {
        let text = parseInt(this.props.substr) > 0 ? this.props.text.substr(0, this.props.substr) + "..." : this.props.text;

        return (
            <div>
                {text}
            </div>
        );
    }
}
