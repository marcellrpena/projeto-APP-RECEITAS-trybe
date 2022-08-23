import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/Contexts';
import RecipeCard from './RecipeCard';

const MAX_RECIPES = 12;
function Recipes() {
  const { recipes } = useContext(RecipesContext);
  console.log({ recipes });

  return (
    <div>
      {
        recipes.length > 1
        && recipes.slice(0, MAX_RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ index }
              cardDataTestId={ `${index}-recipe-card` }
              imgDataTestId={ `${index}-card-img` }
              nameDataTestId={ `${index}-card-name` }
              recipe={ recipe }
            />
          ))
      }
    </div>
  );
}

export default Recipes;
