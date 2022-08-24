const getEndpoint = ({ search, filter }) => {
  if (filter === 'ingredient') return `filter.php?i=${search}`;
  if (filter === 'search') return `search.php?s=${search}`;
  return `search.php?f=${search}`;
};

export const fetchRecipesBy = async (type, userSearch) => {
  const domain = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const ENDPOINT = `https://www.${domain}.com/api/json/v1/1/${getEndpoint(userSearch)}`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data.meals ? data.meals : data.drinks;
  } catch (error) {
    return error;
  }
};

export const fetchRecipesDidMount = async (type) => {
  const domain = type.includes('foods') ? 'themealdb' : 'thecocktaildb';
  const ENDPOINT_RECIPES = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
  const ENDPOINT_CATEGORIES = `https://www.${domain}.com/api/json/v1/1/list.php?c=list`;
  try {
    const responseRecipes = await fetch(ENDPOINT_RECIPES);
    const responseCategories = await fetch(ENDPOINT_CATEGORIES);
    const recipes = await responseRecipes.json();
    const categories = await responseCategories.json();
    return ({
      categories,
      recipes,
    });
  } catch (error) {
    return error;
  }
};

export const fetchByFilter = async (type, category) => {
  const domain = type.includes('foods') ? 'themealdb' : 'thecocktaildb';
  const ENDPOINT = `https://www.${domain}.com/api/json/v1/1/filter.php?c=${category}`;

  try {
    const requestFilterCategory = await fetch(ENDPOINT);
    const response = await requestFilterCategory.json();
    return response;
  } catch (error) {
    return error;
  }
};
