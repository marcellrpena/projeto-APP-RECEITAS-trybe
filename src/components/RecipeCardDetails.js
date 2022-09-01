import React from 'react';
import { shape, string } from 'prop-types';
import '../styles/RecipeDetails.css';

function RecipeCardDetails({ imgTestId, recipe }) {
  return (
    <section>
      <img
        className="recipeImg"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ imgTestId }
      />
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
