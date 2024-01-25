import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1 and their are other pages
    return this._generateMarkupButtons(currPage, numPages);
  }

  _generateMarkupButtons(currPage, numPages) {
    // console.log(currPage,numPages)
    if (currPage === 1 && numPages > 1) {
      return `
            <button  data-goto="${
              currPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>${currPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>`;
    }

    //last Page
    if (currPage === numPages && numPages > 1) {
      return `<button  data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currPage - 1}</span>
            </button>
            `;
    }

    // other Page
    if (currPage < numPages) {
      return `<button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currPage - 1}</span>
            </button>
            <button  data-goto="${
              currPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>${currPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>`;
    }

    //page 1 and their are no pages
    return '';
  }

  addHandlerButtons(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      // console.log(goToPage)
      handler(goToPage);
    });
  }
}

export default new PaginationView();
