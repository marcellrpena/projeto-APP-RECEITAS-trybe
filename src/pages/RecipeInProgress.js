import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import oneMeal from '../Mocks/oneMeal';
import oneDrink from '../Mocks/oneDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import useFavorites from '../hooks/useFavorites';
import { getRecipesInProgress, startRecipe } from '../services/saveStorage';

function RecipeInProgress() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [checkSaved, setCheckSaved] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const { isFavorite, addRecipeToFavorites } = useFavorites(
    false,
    id,
    pathname,
  );

  const INTERVAL_COPY_TAG = 4000;

  const recipe = pathname.includes(oneMeal.meals[0].idMeal)
    ? oneMeal.meals[0]
    : oneDrink.drinks[0];

  const recipeID = recipe.idDrink || recipe.idMeal;
  const recipeType = recipe.idMeal ? 'meals' : 'cocktails';

  const ingredients = Object.entries(recipe).reduce((acc, curr) => {
    if (curr[0].includes('strIngredient') && curr[1]) {
      acc = [...acc, curr[1]];
    }
    return acc;
  }, []);

  const measures = Object.entries(recipe).reduce((acc, curr) => {
    if (curr[0].includes('strMeasure') && curr[1]) {
      acc = [...acc, curr[1]];
    }
    return acc;
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

  const getAndSetProgressRecipes = () => {
    const storageData = getRecipesInProgress();
    const ingredientList = storageData[recipeType][recipeID] || [];
    setCheckSaved([...ingredientList]);
    setRefresh(false);
  };

  const shareRecipe = () => {
    setLinkCopied(true);
    window.navigator.clipboard.writeText(
      window.location.href.split('/in-progress')[0],
    );
    setTimeout(() => setLinkCopied(false), INTERVAL_COPY_TAG);
    clearTimeout();
  };

  useEffect(() => {
    getAndSetProgressRecipes();
  }, []);

  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
        style={ { width: '125px' } }
      />
      <header>
        <div>
          <h4 data-testid="recipe-title">
            {recipe.strMeal || recipe.strDrink}
          </h4>
          <button
            type="button"
            data-testid="share-btn"
            src={ shareIcon }
            alt="Share icon"
            onClick={ () => shareRecipe() }
          >
            <img src={ shareIcon } alt="Share icon" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeart : whiteHeart }
            alt="Share icon"
            onClick={ addRecipeToFavorites }
          >
            <img src={ isFavorite ? blackHeart : whiteHeart } alt="Share icon" />
          </button>
          {linkCopied && <span>Link copied!</span>}
        </div>
        <h6 data-testid="recipe-category">{recipe.strCategory}</h6>
      </header>
      <h4>Ingredients</h4>
      {!refresh
        && ingredients.map((ingredient, index) => (
          <div key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient }
            >
              <input
                type="checkbox"
                name={ ingredient }
                id={ ingredient }
                checked={ checkSaved.includes(ingredient) }
                onChange={ (e) => setProgressRecipe(e) }
              />
              {`${ingredient} - ${measures[index]}`}
            </label>
          </div>
        ))}
      <section>
        <h4>Instructions</h4>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </section>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ ingredients.length !== checkSaved.length }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
