const getEndpoint = ({ search, filter }) => {
  if (filter === 'ingredient') return `filter.php?i=${search}`;
  if (filter === 'search') return `search.php?s=${search}`;
  return `search.php?f=${search}`;
};

const fetchRecipesBy = async (type, userSearch) => {
  const ENDPOINT = `https://www.${type}.com/api/json/v1/1/${getEndpoint(userSearch)}`;
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchRecipesBy;
