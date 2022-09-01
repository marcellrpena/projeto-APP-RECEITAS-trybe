import { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../contexts/Contexts';
import { fetchRecipes } from '../services/fetchRecipes';

function useSuggestions(recipeType) {
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [fetchSuggestions, setFetchSuggestions] = useState(false);
  const { isNewRecipe } = useContext(RecipesContext);

  const ONE_HALF = 0.5;
  const randomize = (recipes) => recipes.sort(() => Math.random() - ONE_HALF);

  useEffect(() => {
    const getSuggestions = async () => {
      const MAX_RECIPES = 6;
      const domain = recipeType.includes('foods') ? 'drinks' : 'foods';
      const data = await fetchRecipes(domain);
      setSuggestedRecipes(
        data.meals
          ? randomize(data.meals).slice(0, MAX_RECIPES)
          : randomize(data.drinks).slice(0, MAX_RECIPES),
      );
      setFetchSuggestions(true);
    };
    getSuggestions();
  }, [isNewRecipe]);

  return { suggestedRecipes, fetchSuggestions };
}

export default useSuggestions;
