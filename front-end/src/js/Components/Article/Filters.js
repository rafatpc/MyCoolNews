import React from "react";
import Dispatcher from "../../Helpers/Dispatcher";
import getNodeById from "../../Helpers/Functions";

export default class ArticleFilters extends React.Component {
    constructor(props) {
        super(props);

        let { activeFilters } = props;

        this.state = {
            from: activeFilters.from || "2016-06-12", //null,
            to: activeFilters.to || "2016-09-12", //null,
            author: activeFilters.author || 0
        };
    }

    onChangeFromDate({ target }) {
        this.setState({
            from: target.value
        });
    }

    onChangeToDate({ target }) {
        this.setState({
            to: target.value
        });
    }

    onChangeAuthor({ target }) {
        this.setState({
            author: target.value
        });
    }

    onClickApply() {
        let { author, from, to } = this.state;

        if (author === 0 && from === null && to === null) {
            return;
        }

        Dispatcher.dispatch({
            type: 'ARTICLES_FILTERS',
            payload: this.state
        });
    }

    onClickClear() {
        Dispatcher.dispatch({
            type: 'ARTICLES_CLEAR_FILTERS'
        });
    }

    render() {
        return (
            <div class="filters" id="filters">
                <h4>Filters</h4>
                <div class="row">
                    <div class="form-group clear">
                        <label for="from" class="col-xs-12 control-label">From</label>
                        <div class="col-xs-12">
                            <input type="date" name="from" class="form-control" onChange={this.onChangeFromDate.bind(this)} />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="to" class="col-xs-12 control-label space">To</label>
                        <div class="col-xs-12">
                            <input type="date" name="to" class="form-control" onChange={this.onChangeToDate.bind(this)} />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="author" class="col-xs-12 control-label space">Author</label>
                        <div class="col-xs-12">
                            <select name="author" class="form-control" onChange={this.onChangeAuthor.bind(this)}>
                                <option value="0">All</option>
                                <option value="1">Liliyan Krumov</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12 filters-buttons">
                            <button type="button" class="btn btn-info apply" onClick={this.onClickApply.bind(this)}>Apply Filters</button>
                            <button type="button" class="btn btn-danger clear" onClick={this.onClickClear.bind(this)}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
