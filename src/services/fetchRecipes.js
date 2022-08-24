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
  const ENDPOINT = `https://www.${domain}.com/api/json/v1/1/search.php?s=`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
