import { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '../services/fetchRecipes';
import { addToFavorites, getFavoritesRecipes } from '../services/saveStorage';

function useFavorites(recipeId, recipeType) {
  const [isFavorite, setIsFavorite] = useState(false);

  const addRecipeToFavorites = async () => {
    setIsFavorite(!isFavorite);
    const recipe = await fetchRecipeDetails(recipeType, recipeId);
    addToFavorites(recipe);
  };

  const getFavorites = () => {
    const isAlreadyFav = getFavoritesRecipes().some(
      ({ id }) => id === recipeId,
    );
    setIsFavorite(isAlreadyFav);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return {
    isFavorite,
    addRecipeToFavorites,
  };
}

export default useFavorites;
