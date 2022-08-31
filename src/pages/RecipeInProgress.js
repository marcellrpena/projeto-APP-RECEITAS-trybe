import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { HiOutlineHeart, HiHeart, HiOutlineShare, HiShare } from 'react-icons/hi';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import useFavorites from '../hooks/useFavorites';
import useRecipe from '../hooks/useRecipe';
import '../styles/RecipeInProgress.css';
import {
  doneRecipe,
  getRecipesInProgress,
  startRecipe,
} from '../services/saveStorage';

function RecipeInProgress() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [checkSaved, setCheckSaved] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const { recipe, isFetched, ingredients, measures } = useRecipe(pathname, id);
  const { isFavorite, addRecipeToFavorites } = useFavorites(
    false,
    id,
    pathname,
  );

  const INTERVAL_COPY_TAG = 4000;

  const getAndSetProgressRecipes = () => {
    const storageData = getRecipesInProgress();
    const type = pathname.includes('foods') ? 'meals' : 'cocktails';
    const ingredientList = storageData[type][id] || [];
    setCheckSaved([...ingredientList]);
    setRefresh(false);
  };

  useEffect(() => {
    getAndSetProgressRecipes();
  }, []);

  const setProgressRecipe = ({ target }) => {
    const type = pathname.includes('foods') ? 'meals' : 'cocktails';
    let doneIngredients = [...checkSaved, target.name];
    if (target.checked) setCheckSaved(doneIngredients);
    else {
      doneIngredients = checkSaved.filter((element) => element !== target.name);
      setCheckSaved(doneIngredients);
    }
    startRecipe(id, type, doneIngredients);
  };

  const shareRecipe = () => {
    setLinkCopied(true);
    clipboardCopy(window.location.href.split('/in-progress')[0]);
  };

  const finishRecipe = () => {
    history.push('/done-recipes');
    doneRecipe(recipe);
  };

  return (
    <div>
      {isFetched && (
        <div className="recipe-in-progress">
          <img
            className="recipeImg"
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid="recipe-photo"
          />
          <header className="title-share-favorite">
            <h4
              data-testid="recipe-title"
              className="title"
            >
              {recipe.strMeal || recipe.strDrink}
            </h4>
            <div className="btn-shareAndfavorite-position">
              <button
                className="btn-share-favorite"
                type="button"
                data-testid="share-btn"
                src={ shareIcon }
                alt="Share icon"
                onClick={ shareRecipe }
              >
                { linkCopied ? <HiShare /> : <HiOutlineShare /> }
              </button>
              <button
                className="btn-share-favorite"
                type="button"
                data-testid="favorite-btn"
                src={ isFavorite ? blackHeart : whiteHeart }
                alt="Favorite icon"
                onClick={ addRecipeToFavorites }
              >
                {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
              </button>
            </div>
          </header>
          <div className="span-category">
            <h6
              data-testid="recipe-category"
              className="category"
            >
              {recipe.strCategory}
            </h6>
          </div>
          <h4 className="title-ingredients">Ingredients</h4>
          <div className="ingredient-list">
            {!refresh
              && ingredients.map((ingredient, index) => (
                <div key={ index } className="ingredient-check">
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    htmlFor={ ingredient }
                    className="margin-zero ingredient-check"
                  >
                    <input
                      type="checkbox"
                      name={ ingredient }
                      id={ ingredient }
                      checked={ checkSaved.includes(ingredient) }
                      onChange={ (e) => setProgressRecipe(e) }
                      className="ingredient-check"
                    />
                    {` ${ingredient} - ${measures[index]}`}
                  </label>
                </div>
              ))}
          </div>
          <h4 className="title-instructions">Instructions</h4>
          <div className="instructions-text">
            <p
              data-testid="instructions"
              className="text-style"
            >
              {recipe.strInstructions}
            </p>
          </div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ ingredients.length !== checkSaved.length }
            onClick={ finishRecipe }
            className="btn btn-secondary btn-login"
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
