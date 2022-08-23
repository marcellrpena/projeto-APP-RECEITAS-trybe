import React, { useContext, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { RecipesContext } from '../contexts/Contexts';
import RecipeCard from './RecipeCard';
import { fetchRecipesDidMount } from '../services/fetchRecipes';

const MAX_RECIPES = 12;
function Recipes({ props: { history } }) {
  const { recipes: { meals, drinks }, setRecipes, recipes } = useContext(RecipesContext);
  const { pathname } = history.location;

  useEffect(() => {
    const request = async () => {
      const response = await fetchRecipesDidMount(pathname);
      const result = { ...recipes, ...response };
      setRecipes(result);
    };
    request();
  }, []);

  const recipesToRender = pathname.includes('foods') ? meals : drinks;

  return (
    <main>
      {
        recipesToRender.length > 1
        && recipesToRender.slice(0, MAX_RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ recipe.strMeal || recipe.strDrink }
              cardTestId={ `${index}-recipe-card` }
              imgTestId={ `${index}-card-img` }
              nameTestId={ `${index}-card-name` }
              recipe={ recipe }
            />
          ))
      }
    </main>
  );
}

Recipes.propTypes = {
  props: shape({
    history: shape({
      location: shape({ pathname: string }),
    }),
  }).isRequired,
};

export default Recipes;
