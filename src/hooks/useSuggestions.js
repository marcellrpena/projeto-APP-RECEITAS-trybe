import { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/fetchRecipes';

function useSuggestions(defaultValue, recipeType) {
  const [suggestedRecipes, setSuggestedRecipes] = useState(defaultValue);
  const [fetchSuggestions, setFetchSuggestions] = useState(false);

  useEffect(() => {
    const getSuggestions = async () => {
      const MAX_RECIPES = 6;
      const domain = recipeType.includes('foods') ? 'drinks' : 'foods';
      const data = await fetchRecipes(domain);
      setSuggestedRecipes(
        data.meals
          ? data.meals.slice(0, MAX_RECIPES)
          : data.drinks.slice(0, MAX_RECIPES),
      );
      setFetchSuggestions(true);
    };
    getSuggestions();
  }, []);

  return { suggestedRecipes, fetchSuggestions };
}

export default useSuggestions;
