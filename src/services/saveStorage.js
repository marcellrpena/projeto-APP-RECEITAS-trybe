export const getFavoritesRecipes = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes')) || []);

export const addToFavorites = (recipeInfo) => {
  if (getFavoritesRecipes().some(({ id }) => id === recipeInfo.idDrink)) {
    const index = getFavoritesRecipes().findIndex(({ id }) => (
      id === recipeInfo.idDrink
    ));
    const favorites = getFavoritesRecipes();
    favorites.splice(index, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  } else {
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
  }
};
