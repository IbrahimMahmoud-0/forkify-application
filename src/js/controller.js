import * as model from './modle.js';
import { MODAL_CLOSE_SEC } from './config.js';

import recipeView from './views/recipeView.js';
// import icons from '../img/icons.svg'  parcel version 1
import 'core-js/stable'; // poly everything else
import 'regenerator-runtime/runtime'; // polyfylling async await
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //update result view to mark selected search result
    resultsView.update(model.getSearchResults());

    // load reicpe
    await model.loadRecipe(id); // stoping the execution
    // rendering recipe
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  } catch (e) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    // console.log(query)
    if (!query) return;
    // load search results
    await model.loadSearchResults(query);
    // render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResults(), true);
    // redner pagination button
    paginationView.render(model.state.search);
    // console.log(model.state.search)
  } catch (e) {
    console.error(e);
  }
};
//  controlSearchResults();

const constrolPagination = function (goToPage) {
  // console.log('YOU CLICKED A BUTTON');
  resultsView.render(model.getSearchResults(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add || Remove bookmare
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2 update recipe view
  recipeView.update(model.state.recipe);
  // Render bookmarked recipes
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks, true);
};

const controlAddRecipes = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`🔥🔥🔥 ${err}`);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerPublisher(controlRecipes);
  // ----------------------------------------------------
  recipeView.addHandlerUpdateServings(controlServings);
  // ----------------------------------------------------
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  // ----------------------------------------------------
  bookmarksView.addHandlerRender(controlBookmarks);
  // ----------------------------------------------------
  searchView.addHandlerSearch(controlSearchResults);
  // ----------------------------------------------------
  paginationView.addHandlerButtons(constrolPagination);
  // ----------------------------------------------------
  addRecipeView.addHandlerUpload(controlAddRecipes);
};
init();
// controlRecipes('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc990');

/*
['hashchange','load'].forEach(element => 
    window.addEventListener(element,getRecipe)
  );*/
