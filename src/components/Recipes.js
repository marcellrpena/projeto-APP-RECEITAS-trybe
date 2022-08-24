import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';
import RecipeCard from './RecipeCard';
import { fetchRecipesDidMount } from '../services/fetchRecipes';

function Recipes() {
  const history = useHistory();
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { meals, drinks } = recipes;
  const { pathname } = history.location;

  useEffect(() => {
    const request = async () => {
      const response = await fetchRecipesDidMount(pathname);
      const result = { ...recipes, ...response };
      setRecipes(result);
    };
    request();
  }, []);

  const MAX_RECIPES = 12;
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

export default Recipes;
