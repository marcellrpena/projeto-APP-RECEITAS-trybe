import React from 'react';
import { useHistory } from 'react-router-dom';
import oneMeal from '../Mocks/oneMeal';
import oneDrink from '../Mocks/oneDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { location } = useHistory();
  const recipe = location.pathname.includes(oneMeal.meals[0].idMeal)
    ? oneMeal.meals[0] : oneDrink.drinks[0];
  const ingredients = Object.entries(recipe).reduce((acc, curr) => {
    if (curr[0].includes('strIngredient')
    && curr[1] !== '' && curr[1] !== null) {
      acc = [...acc, curr[1]];
    }
    return acc;
  }, []);
  const measures = Object.entries(recipe).reduce((acc, curr) => {
    if (curr[0].includes('strmeasure')
    && curr[1] !== '' && curr[1] !== null) {
      acc = [...acc, curr[1]];
    }
    return acc;
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
        ingredients.map((ingredient, index) => (
          <div key={ index }>
            <label htmlFor="ingredient">
              <input
                data-testid={ `${index}-ingredient-step` }
                type="checkbox"
                name={ ingredient }
                id="ingredient"
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
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;
