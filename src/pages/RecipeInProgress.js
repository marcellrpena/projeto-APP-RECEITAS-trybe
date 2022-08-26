import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import oneMeal from '../Mocks/oneMeal';
import oneDrink from '../Mocks/oneDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { location } = useHistory();
  const [checkSaved, setCheckSaved] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const recipe = location.pathname.includes(oneMeal.meals[0].idMeal)
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

  const progress = ({ target }) => (target.checked
    ? setCheckSaved([...checkSaved, target.name])
    : setCheckSaved([...checkSaved.filter((element) => element !== target.name)]));

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(storageData === null);
    if (!storageData) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ meals: {}, cocktails: {} }));
      console.log('set new localStorage');
      setRefresh(false);
    } else if (refresh && Object.keys(storageData[recipeType]).includes(recipeID)) {
      setCheckSaved([...storageData[recipeType][recipeID]]);
      console.log('setCheckedSaved');
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
      console.log('set localStorage');
    }
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
          >
            <img src={ shareIcon } alt="Share icon" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            src={ whiteHeart }
            alt="Share icon"
          >
            <img src={ whiteHeart } alt="Share icon" />
          </button>
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
                onChange={ (e) => progress(e) }
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
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
