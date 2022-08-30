export const getFavoritesRecipes = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes')) || []);

export const getRecipesInProgress = () => (
  JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    meals: {},
    cocktails: {},
  });

export const getDoneRecipes = () => (
  JSON.parse(localStorage.getItem('doneRecipes')) || []
);

const validateFavs = (recipe, storage) => storage.some(({ id }) => id === recipe.id);

const recipeInformations = (recipe) => ({
  id: recipe.idMeal || recipe.idDrink,
  type: recipe.idMeal ? 'food' : 'drink',
  nationality: recipe.strArea || '',
  category: recipe.strCategory,
  alcoholicOrNot: recipe.idDrink ? recipe.strAlcoholic : '',
  name: recipe.strMeal || recipe.strDrink,
  image: recipe.strMealThumb || recipe.strDrinkThumb,
});

export const addToFavorites = (recipeInfo) => {
  const favStorage = getFavoritesRecipes();
  const newRecipe = recipeInformations(recipeInfo);
  if (validateFavs(newRecipe, favStorage)) {
    const index = favStorage.indexOf(newRecipe);
    favStorage.splice(index, 1);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(favStorage));
  }
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([...favStorage, newRecipe]),
  );
};

export const startRecipe = (recipeId, recipeType, ingredients = []) => {
  const recipesStorage = getRecipesInProgress();
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

const getDate = () => {
  const dateObj = new Date();
  const MINUSTWO = -2;
  const day = (`0${dateObj.getDate()}`).slice(MINUSTWO);
  const month = (`0${dateObj.getMonth() + 1}`).slice(MINUSTWO);
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

export const doneRecipe = (recipe) => {
  const doneRecipesStorage = getDoneRecipes();
  const newDoneRecipe = {
    ...recipeInformations(recipe),
    doneDate: getDate(),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };
  localStorage.setItem('doneRecipes', JSON.stringify([
    ...doneRecipesStorage, newDoneRecipe,
  ]));
};
