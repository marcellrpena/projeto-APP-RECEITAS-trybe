const getEndpoint = ({ search, filter }) => {
  if (filter === 'ingredient') return `filter.php?i=${search}`;
  if (filter === 'search') return `search.php?s=${search}`;
  return `search.php?f=${search}`;
};

const domain = (type) => (type.includes('foods') ? 'meal' : 'cocktail');

export const fetchRecipesBy = async (type, userSearch) => {
  const ENDPOINT = `https://www.the${domain(
    type,
  )}db.com/api/json/v1/1/${getEndpoint(userSearch)}`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data.meals ? data.meals : data.drinks;
  } catch (error) {
    return error;
  }
};

export const fetchRecipes = async (type) => {
  const ENDPOINT = `https://www.the${domain(
    type,
  )}db.com/api/json/v1/1/search.php?s=`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCategories = async (type) => {
  const ENDPOINT = `https://www.the${domain(
    type,
  )}db.com/api/json/v1/1/list.php?c=list`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchByFilter = async (type, category) => {
  const ENDPOINT = `https://www.the${domain(
    type,
  )}db.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const requestFilterCategory = await fetch(ENDPOINT);
    const response = await requestFilterCategory.json();
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchRecipeDetails = async (type, id) => {
  const ENDPOINT = `https://www.the${domain(
    type,
  )}db.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data.meals ? data.meals[0] : data.drinks[0];
  } catch (error) {
    return error;
  }
};
