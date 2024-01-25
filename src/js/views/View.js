import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the recived object to the DOM
   * @param {Object| Object[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render=true] if false ,create makrup  stirng instead of rendering to the DOM
   * @returns {undefined | string} A markup is returned if render is false
   * @this {object} View instance
   * @authro ibrahim Mahmmoud
   * @todo finsih the implemenation
   *
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this._clear();
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements,newElements)

    newElements.forEach((el, i) => {
      const curElement = curElements[i];
      // console.log(curElement,el.isEqualNode(curElement))

      if (
        !el.isEqualNode(curElement) &&
        el?.firstChild?.nodeValue.trim() !== ''
      ) {
        curElement.textContent = el.textContent;
        // console.log('the broweser executes this if clause')
      }
      if (!el.isEqualNode(curElement)) {
        Array.from(el.attributes).forEach(attr =>
          curElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `<div class="spinner">
                          <svg>
                            <use href="${icons}#icon-loader"></use>
                          </svg>
                       </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = ` <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="recipe">
        <div class="message ">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
