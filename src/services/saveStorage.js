export const getFavoritesRecipes = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes')) || []);

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
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([...getFavoritesRecipes(), newRecipe]),
  );
};
