import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';

function RecipeCard({ cardTestId, imgTestId, nameTestId, recipe, recipeType }) {
  const history = useHistory();
  const { setIsSearching } = useContext(RecipesContext);

  const goToDetails = () => {
    setIsSearching(false);
    history.push(`${recipeType}/${recipe.idMeal || recipe.idDrink}`);
  };

  return (
    <section>
      <button onClick={ goToDetails } type="button" data-testid={ cardTestId }>
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

RecipeCard.defaultProps = {
  cardTestId: '',
  imgTestId: '',
  nameTestId: '',
  recipeType: '',
  recipe: {
    idMeal: '',
    strMeal: '',
    strCategory: '',
    strDrinkThumb: '',
  },
};

RecipeCard.propTypes = {
  cardTestId: string,
  imgTestId: string,
  nameTestId: string,
  recipeType: string,
  recipe: shape({
    idMeal: string,
    strMeal: string,
    strCategory: string,
    strDrinkThumb: string,
  }),
};

export default RecipeCard;
