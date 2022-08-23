import { shape, string } from 'prop-types';
import React from 'react';

function RecipeCard({ cardTestId, imgTestId, nameTestId, recipe }) {
  return (
    <div data-testid={ cardTestId }>
      <h2 data-testid={ nameTestId }>{recipe.strMeal || recipe.strDrink}</h2>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ imgTestId }
        style={ { width: '125px' } }
      />
    </div>
  );
}

RecipeCard.propTypes = {
  cardTestId: string.isRequired,
  imgTestId: string.isRequired,
  nameTestId: string.isRequired,
  recipe: shape({
    strMeal: string,
    strMealThumb: string,
  }).isRequired,
};

export default RecipeCard;
