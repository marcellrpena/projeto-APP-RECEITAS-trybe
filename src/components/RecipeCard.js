import React from 'react';
import { bool, shape, string } from 'prop-types';

function RecipeCard({
  cardTestId,
  imgTestId,
  nameTestId,
  recipe,
  showCategory,
}) {
  return (
    <div data-testid={ cardTestId }>
      <h2 data-testid={ nameTestId }>{recipe.strMeal || recipe.strDrink}</h2>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ imgTestId }
        style={ { width: '125px' } }
      />
      {showCategory && (
        <p data-testid="recipe-category">
          {recipe.strAlcoholic || recipe.strCategory}
        </p>
      )}
    </div>
  );
}

RecipeCard.defaultProps = {
  cardTestId: '',
  imgTestId: '',
  nameTestId: '',
  showCategory: false,
};

RecipeCard.propTypes = {
  cardTestId: string,
  imgTestId: string,
  nameTestId: string,
  showCategory: bool,
  recipe: shape({
    strMeal: string,
    strMealThumb: string,
  }).isRequired,
};

export default RecipeCard;
