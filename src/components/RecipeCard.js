import React from 'react';
import { shape, string } from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeCard({ cardTestId, imgTestId, nameTestId, recipe, recipeType }) {
  const history = useHistory();

  const goToDetails = () => {
    history.push(`${recipeType}/${recipe.idMeal || recipe.idDrink}`);
  };

  return (
    <section>
      <button
        onClick={ goToDetails }
        type="button"
        data-testid={ cardTestId }
      >
        <h2 data-testid={ nameTestId }>{recipe.strMeal || recipe.strDrink}</h2>
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid={ imgTestId }
          style={ { width: '125px' } }
        />
      </button>
    </section>
  );
}

RecipeCard.propTypes = {
  cardTestId: string.isRequired,
  imgTestId: string.isRequired,
  nameTestId: string.isRequired,
  recipeType: string.isRequired,
  recipe: shape({
    strMeal: string,
    strMealThumb: string,
  }).isRequired,
};

export default RecipeCard;
