import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';
import { fetchRecipesDidMount } from '../services/fetchRecipes';
import RecipeCard from './RecipeCard';

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

export default Recipes;
