const getEndpoint = ({ search, filter }) => {
  if (filter === 'ingredient') return `filter.php?i=${search}`;
  if (filter === 'search') return `search.php?s=${search}`;
  return `search.php?f=${search}`;
};

export const fetchRecipesBy = async (type, userSearch) => {
  const recipeType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const ENDPOINT = `https://www.${recipeType}.com/api/json/v1/1/${getEndpoint(userSearch)}`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data.meals ? data.meals : data.drinks;
  } catch (error) {
    return error;
  }
};

export const fetchRecipesDidMount = async (type) => {
  const recipeType = type === '/foods' ? 'themealdb' : 'thecocktaildb';
  const ENDPOINT = `https://www.${recipeType}.com/api/json/v1/1/search.php?s=`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
