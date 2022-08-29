import { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '../services/fetchRecipes';

const useRecipe = (pathname, id) => {
  const [recipe, setRecipe] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const getRecipeDetails = async () => {
      const getRecipe = await fetchRecipeDetails(pathname, id);
      setRecipe(getRecipe);
      setIsFetched(true);

      setIngredients(
        Object.entries(getRecipe).reduce((acc, curr) => {
          if (curr[0].includes('strIngredient') && curr[1]) {
            acc = [...acc, curr[1]];
          }
          return acc;
        }, []),
      );

      setMeasures(
        Object.entries(getRecipe).reduce((acc, curr) => {
          if (curr[0].includes('strMeasure') && curr[1]) {
            acc = [...acc, curr[1]];
          }
          return acc;
        }, []),
      );
    };
    getRecipeDetails();
  }, []);

  return {
    recipe,
    ingredients,
    isFetched,
    measures,
  };
};

export default useRecipe;
