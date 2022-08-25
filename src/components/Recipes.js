import React, { useContext, useEffect } from 'react';
/* import { shape, string } from 'prop-types'; */
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';
import RecipeCard from './RecipeCard';
import { fetchRecipesDidMount } from '../services/fetchRecipes';

const MAX_RECIPES = 12;
function Recipes() {
  const history = useHistory();
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

  const recipesToRender = pathname === '/foods' ? meals : drinks;
  console.log(recipesToRender);

  return (
    <div>
      {
        recipesToRender.length > 1
        && recipesToRender.slice(0, MAX_RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ index }
              cardDataTestId={ `${index}-recipe-card` }
              imgDataTestId={ `${index}-card-img` }
              nameDataTestId={ `${index}-card-name` }
              recipe={ recipe }
            />
          ))
      }
    </div>
  );
}

/* Recipes.propTypes = {
  props: shape({
    history: shape({
      location: shape({ pathname: string }),
    }),
  }).isRequired,
}; */

export default Recipes;
