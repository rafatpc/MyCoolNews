import React from "react";
import { Link } from "react-router";


export default class ArticlePreview extends React.Component {
    constructor(props) {
        super(props);

        let { onNavigate, currentPage, total, perPage } = this.props

        this.onNavigate = onNavigate;
        this.state = {
            currentPage,
            maxPage: Math.ceil(total / perPage)
        };
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

    navigate(page) {
        this.onNavigate(page);
        this.setState({
            currentPage: page
        });
    }

    onClickPage(e) {
        let { target } = e;
        let { page, disabled } = target.dataset;

        if (disabled === 'disabled') {
            e.preventDefault();
            return;
        }

        this.onNavigate(page);
        this.setState({
            currentPage: page
        });
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
