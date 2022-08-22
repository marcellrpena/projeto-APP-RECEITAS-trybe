const getEndpoint = ({ search, filter }) => {
  if (filter === 'igredient') return `filter.php?i=${search}`;
  if (filter === 'search') return `search.php?s=${search}`;
  return `search.php?f=${search}`;
};

const fetchRecipes = async (userSearch) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/${getEndpoint(userSearch)}`;
  console.log(ENDPOINT);
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchRecipes;
