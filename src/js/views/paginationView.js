import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupButton(direction, curPage) {
    const goToPage = direction === 'next' ? curPage + 1 : curPage - 1;
    return `
        <button data-goto="${goToPage}" class="btn--inline pagination__btn--${direction}">
            <span>Page ${goToPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      direction === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
          </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev', curPage) +
        this._generateMarkupButton('next', curPage)
      );
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
