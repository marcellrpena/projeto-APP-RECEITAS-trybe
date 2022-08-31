import { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../contexts/Contexts';
import { fetchRecipeDetails } from '../services/fetchRecipes';

const useRecipe = (pathname, id) => {
  const [recipe, setRecipe] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { isNewRecipe } = useContext(RecipesContext);

  useEffect(() => {
    const getRecipeDetails = async () => {
      const { type, recipeId } = isNewRecipe;
      const getRecipe = await fetchRecipeDetails(pathname || type, id || recipeId);
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
  }, [isNewRecipe]);

  return {
    recipe,
    ingredients,
    isFetched,
    measures,
    setRecipe,
  };
};

export default useRecipe;
