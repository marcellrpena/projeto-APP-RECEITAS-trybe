import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';
import { fetchByFilter } from '../services/fetchRecipes';
import CategoryButton from './CategoryButton';
import RecipeCard from './RecipeCard';

function Recipes() {
  const history = useHistory();
  const { recipes, categories, loadRecipes, setRecipes } = useContext(RecipesContext);
  const { meals, drinks } = recipes;
  const { pathname } = history.location;
  const [isFiltered, setIsFiltered] = useState(false);

  const handleClickFilter = async (category) => {
    if (!isFiltered) {
      setIsFiltered(!isFiltered);
      const filter = await fetchByFilter(pathname, category);
      setRecipes({ ...recipes, ...filter });
    } else {
      loadRecipes();
    }
  };

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;
  const recipesToRender = pathname.includes('foods') ? meals : drinks;
  const categoriesToRender = pathname.includes('foods')
    ? categories.meals
    : categories.drinks;

  return (
    <div>
      <nav>
        {categoriesToRender.length > 0
          && categoriesToRender
            .slice(0, MAX_CATEGORIES)
            .map(({ strCategory }) => (
              <CategoryButton
                key={ strCategory }
                onClick={ () => handleClickFilter(strCategory) }
                categoryType={ strCategory }
                dataTestid={ `${strCategory}-category-filter` }
              />
            ))}
        <CategoryButton
          categoryType="All"
          onClick={ () => loadRecipes() }
          dataTestid="All-category-filter"
        />
      </nav>
      <main>
        {recipesToRender.length > 0
          && recipesToRender
            .slice(0, MAX_RECIPES)
            .map((recipe, index) => (
              <RecipeCard
                key={ recipe.strMeal || recipe.strDrink }
                cardTestId={ `${index}-recipe-card` }
                imgTestId={ `${index}-card-img` }
                nameTestId={ `${index}-card-name` }
                recipe={ recipe }
              />
            ))}
      </main>
    </div>
  );
}

export default Recipes;
