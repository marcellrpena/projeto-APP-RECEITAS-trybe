export const getFavoritesRecipes = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes')) || []);

export const getRecipesInProgress = () => (
  JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    meals: {},
    cocktails: {},
  });

const validateFavs = (recipe, storage) => storage.some(({ id }) => id === recipe.id);

export const addToFavorites = (recipeInfo) => {
  const favStorage = getFavoritesRecipes();
  const newRecipe = {
    id: recipeInfo.idMeal || recipeInfo.idDrink,
    type: recipeInfo.idMeal ? 'food' : 'drink',
    nationality: recipeInfo.strArea || '',
    category: recipeInfo.strCategory,
    alcoholicOrNot: recipeInfo.idDrink ? recipeInfo.strAlcoholic : '',
    name: recipeInfo.strMeal || recipeInfo.strDrink,
    image: recipeInfo.strMealThumb || recipeInfo.strDrinkThumb,
  };
  if (validateFavs(newRecipe, favStorage)) {
    const index = favorites.indexOf(newRecipe);
    favorites.splice(index, 1);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([...favStorage, newRecipe]),
  );
};

export const startRecipe = (recipeId, recipeType, ingredients = []) => {
  const recipesStorage = getRecipesInProgress();
  console.log(ingredients);
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({
      ...recipesStorage,
      [recipeType]: {
        ...recipesStorage[recipeType],
        [recipeId]: [...ingredients],
      },
    }),
  );
};
