import View from "./View.js";
import previewView from "./previewView.js";


class ResultsView extends View{
    _parentElement=document.querySelector('.results');
    _errorMessage=`No recipes found for your query! Please try again ;)`;
    _message='';

   
    _generateMarkup(){
  
return this._data.map(result=>previewView.render(result,false)).join("");

}

  // _generateMarkupPreview(el){
  //   // <a class="preview__link preview__link--active" href="#${el.id}">  if the link is active the color will change
  //   // this._clear();
  //   const id = window.location.hash.slice(1);

  //   return `
  //     <li class="preview">
  //     <a class="preview__link ${el.id===id?'preview__link--active':''}" href="#${el.id}"> 
  //       <figure class="preview__fig">
  //         <img src="${el.image}" alt="Test" />
  //       </figure>
  //       <div class="preview__data">
  //         <h4 class="preview__title">${el.title}</h4>
  //         <p class="preview__publisher">${el.publisher}</p>
  //         <div class="preview__user-generated">
  //           <svg>
  //             <use href="${icons}#icon-user"></use>
  //           </svg>
  //         </div>
  //       </div>
  //     </a>
  //   </li> `
  // }

}

export default new ResultsView();