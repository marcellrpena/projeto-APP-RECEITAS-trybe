import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import oneMeal from '../Mocks/oneMeal';
import oneDrink from '../Mocks/oneDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const history = useHistory();
  const { pathname } = history.location;
  const INTERVAL_COPY_TAG = 4000;
  const [checkSaved, setCheckSaved] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const recipe = pathname.includes(oneMeal.meals[0].idMeal)
    ? oneMeal.meals[0] : oneDrink.drinks[0];

  const recipeID = recipe.idDrink || recipe.idMeal;
  const recipeType = recipe.idMeal ? 'meals' : 'cocktails';

  const ingredients = Object.entries(recipe).reduce((acc, curr) => {
    if (curr[0].includes('strIngredient')
    && curr[1] !== '' && curr[1] !== null) {
      acc = [...acc, curr[1]];
    }
    return acc;
  }, []);
  const measures = Object.entries(recipe).reduce((acc, curr) => {
    if (curr[0].includes('strMeasure')
    && curr[1] !== '' && curr[1] !== null) {
      acc = [...acc, curr[1]];
    }
    return acc;
  }, []);

  const setProgressRecipe = ({ target }) => (target.checked
    ? setCheckSaved([...checkSaved, target.name])
    : setCheckSaved([...checkSaved.filter((element) => element !== target.name)]));

  const checkIfFavoriteRecipe = () => {
    const storageFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storageFavoriteRecipe) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavorite(storageFavoriteRecipe.find((element) => element.id === recipeID));
    }
  };

  const markOrNotAsFavorite = (isFavorite) => {
    const storageFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // console.log(isFavorite);
    if (isFavorite) {
      setFavorite(isFavorite);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(storageFavoriteRecipe.concat({
          id: recipeID,
          type: pathname.includes('foods') ? 'food' : 'drink',
          nationality: recipe.strArea || '',
          category: recipe.strCategory || '',
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strMeal || recipe.strDrink,
          image: recipe.strMealThumb || recipe.strDrinkThumb,
        })));
      // console.log(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    if (!isFavorite) {
      setFavorite(isFavorite);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(storageFavoriteRecipe.filter((element) => element.id !== recipeID)));
    }
  };

  const getAndSetProgressRecipes = () => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(storageData === null);
    if (!storageData) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ meals: {}, cocktails: {} }));
      // console.log('set new localStorage');
      setRefresh(false);
    } else if (refresh && Object.keys(storageData[recipeType]).includes(recipeID)) {
      setCheckSaved([...storageData[recipeType][recipeID]]);
      // console.log('setCheckedSaved');
      setRefresh(false);
    } else {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({
          ...storageData,
          [recipeType]: {
            ...storageData[recipeType],
            [recipeID]: [...checkSaved],
          },
        }));
      // console.log('set localStorage');
    }
  };

  const shareRecipe = () => {
    setLinkCopied(true);
    clipboardCopy(window.location.href.split('/in-progress')[0]);
    setTimeout(() => setLinkCopied(false), INTERVAL_COPY_TAG);
    clearTimeout();
  };

  useEffect(() => {
    checkIfFavoriteRecipe();
    getAndSetProgressRecipes();
  }, [checkSaved]);

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
          <h4 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h4>
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
            src={ favorite ? blackHeart : whiteHeart }
            alt="Share icon"
            onClick={ () => markOrNotAsFavorite(!favorite) }
          >
            <img src={ favorite ? blackHeart : whiteHeart } alt="Share icon" />
          </button>
          {
            linkCopied && <span>Link copied!</span>
          }
        </div>
        <h6
          data-testid="recipe-category"
        >
          { recipe.strCategory }
        </h6>
      </header>
      <h4>Ingredients</h4>
      {
        !refresh && ingredients.map((ingredient, index) => (
          <div key={ index }>
            <label data-testid={ `${index}-ingredient-step` } htmlFor={ ingredient }>
              <input
                type="checkbox"
                name={ ingredient }
                id={ ingredient }
                checked={ checkSaved.includes(ingredient) }
                onChange={ (e) => setProgressRecipe(e) }
              />
              { `${ingredient} - ${measures[index]}` }
            </label>
          </div>
        ))
      }
      <section>
        <h4>Instructions</h4>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
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
