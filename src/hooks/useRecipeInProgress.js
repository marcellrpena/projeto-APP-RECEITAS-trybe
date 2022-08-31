import { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '../services/fetchRecipes';

const useRecipeInProgress = (pathname, id) => {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const getRecipe = await fetchRecipeDetails(pathname, id);
      setRecipe(getRecipe);
    };
    fetchRecipe().then(() => {
      setIngredients(Object.entries(recipe).reduce((acc, curr) => {
        if (curr[0].includes('strIngredient') && curr[1]) {
          acc = [...acc, curr[1]];
        }
        return acc;
      }, []));
      setMeasures(Object.entries(recipe).reduce((acc, curr) => {
        if (curr[0].includes('strMeasure') && curr[1]) {
          acc = [...acc, curr[1]];
        }
        return acc;
      }, []));
    });
  }, []);

  return {
    recipe,
    ingredients,
    measures,
  };
};

export default useRecipeInProgress;
