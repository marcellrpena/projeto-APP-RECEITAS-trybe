export const getFavoritesRecipes = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes')) || []);

const validateFavs = (recipe) => getFavoritesRecipes()
  .some(({ id }) => id === recipe.id);

export const addToFavorites = (recipeInfo) => {
  const newRecipe = {
    id: recipeInfo.idMeal || recipeInfo.idDrink,
    type: recipeInfo.idMeal ? 'food' : 'drink',
    nationality: recipeInfo.strArea || '',
    category: recipeInfo.strCategory,
    alcoholicOrNot: recipeInfo.idDrink ? recipeInfo.strAlcoholic : '',
    name: recipeInfo.strMeal || recipeInfo.strDrink,
    image: recipeInfo.strMealThumb || recipeInfo.strDrinkThumb,
  };
  if (validateFavs(newRecipe)) {
    const favorites = getFavoritesRecipes();
    const index = favorites.indexOf(newRecipe);
    favorites.splice(index, 1);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([...getFavoritesRecipes(), newRecipe]),
  );
};
