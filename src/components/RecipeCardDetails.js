import React from 'react';
import { shape, string } from 'prop-types';

function RecipeCardDetails({ imgTestId, nameTestId, recipe }) {
  return (
    <section>
      <h2 data-testid={ nameTestId }>{recipe.strMeal || recipe.strDrink}</h2>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ imgTestId }
        style={ { width: '125px' } }
      />
      <p data-testid="recipe-category">{recipe.strCategory}</p>
    </section>
  );
}

RecipeCardDetails.defaultProps = {
  imgTestId: '',
  nameTestId: '',
  recipe: {
    idMeal: '',
    strMeal: '',
    strCategory: '',
    strDrinkThumb: '',
  },
};

RecipeCardDetails.propTypes = {
  imgTestId: string,
  nameTestId: string,
  recipe: shape({
    idMeal: string,
    strMeal: string,
    strCategory: string,
    strDrinkThumb: string,
  }),
};

export default RecipeCardDetails;
