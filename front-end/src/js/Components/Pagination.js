import React from "react";
import ArticlesStore from "../Stores/Articles";
import Dispatcher from "../Helpers/Dispatcher";
import { Link } from "react-router";


export default class ArticlePreview extends React.Component {
    constructor(props) {
        super(props);

        let { currentPage, total, perPage } = this.props;

        this.onPageChanged = this.onPageChanged.bind(this);
        this.state = {
            currentPage,
            maxPage: Math.ceil(total / perPage)
        };
    }

    componentWillMount() {
        ArticlesStore.on('PAGE_CHANGED', this.onPageChanged);
    }

    componentWillUnmount() {
        ArticlesStore.removeListener('PAGE_CHANGED', this.onPageChanged);
    }

    generatePaginator() {
        let { maxPage, currentPage } = this.state;
        let numbers = [];
        let clickHandler = this.onClickPage.bind(this);

        for (var i = 1; i <= maxPage; i++) {
            let route = this.props.route + i;

            numbers.push(
                <li class={currentPage == i ? 'active' : ''} key={i}>
                    <a href={route} data-page={i} data-disabled={currentPage == i ? 'disabled' : ''} onClick={clickHandler}>{i}</a>
                </li>
            );
        }

        return numbers;
    }

    generatePaginatorArrows() {
        let { currentPage, maxPage } = this.state;
        currentPage = parseInt(currentPage);
        maxPage = parseInt(maxPage);
        let { route } = this.props;
        let navigateHandler = this.onClickPage.bind(this);

        let isFirstPage = currentPage == 1;
        let prevPage = isFirstPage ? currentPage : (currentPage - 1);
        let prevDisabled = isFirstPage == 1 ? 'disabled' : '';
        let prevRoute = route + prevPage;

        let isLastPage = maxPage == currentPage;
        let nextPage = isLastPage ? maxPage : (currentPage + 1);
        let nextDisabled = isLastPage ? 'disabled' : '';
        let nextRoute = route + nextPage;

        return {
            prev: <li class={prevDisabled}>
                      <a href={prevRoute} data-page={prevPage} onClick={navigateHandler.bind(prevPage)} data-disabled={prevDisabled}>&laquo;</a>
                  </li>,
            next: <li class={nextDisabled}>
                      <a href={nextRoute} data-page={nextPage} onClick={navigateHandler.bind(nextPage)} data-disabled={nextDisabled}>&raquo;</a>
                  </li>
        }
    }

    onClickPage(e) {
        e.preventDefault();

        let { target } = e;
        let { page, disabled } = target.dataset;

        if (disabled === 'disabled') {
            return;
        }

        this.setState({
            currentPage: page
        });

        Dispatcher.dispatch({
            type: 'PAGINATION_PAGE_CHANGED',
            payload: page
        })
    }

    onPageChanged(currentPage) {
        this.setState({ currentPage });
    }

    render() {
        let generatePaginator = this.generatePaginator.bind(this);
        let arrows = this.generatePaginatorArrows();

        return(
            <ul class="pagination pagination-sm">
                {arrows.prev}
                {generatePaginator()}
                {arrows.next}
            </ul>
        );
    }
}
