import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';
import { fetchRecipesDidMount, fetchByFilter } from '../services/fetchRecipes';
import CategoryButton from './CategoryButton';
import RecipeCard from './RecipeCard';

function Recipes() {
  const history = useHistory();
  const { recipes, categories, setRecipes, setCategories } = useContext(RecipesContext);
  const { meals, drinks } = recipes;
  const { pathname } = history.location;
  const [isFiltered, setIsFiltered] = useState(false);

  const loadRecipes = async () => {
    const response = await fetchRecipesDidMount(pathname);
    setRecipes({ ...recipes, ...response.recipes });
    setCategories({ ...categories, ...response.categories });
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleClickFilter = async (category) => {
    if (!isFiltered) {
      setIsFiltered(!isFiltered);
      const filter = await fetchByFilter(pathname, category);
      return setRecipes({ ...recipes, ...filter });
    }
    loadRecipes();
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
        {categoriesToRender.length >= 1
          && categoriesToRender
            .slice(0, MAX_CATEGORIES)
            .map(({ strCategory }, index) => (
              <CategoryButton
                key={ `${index}-category` }
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
      {recipesToRender.length >= 1 && (
        <main>
          {recipesToRender.slice(0, MAX_RECIPES).map((recipe, index) => (
            <RecipeCard
              key={ `${index}-recipe` }
              cardTestId={ `${index}-recipe-card` }
              imgTestId={ `${index}-card-img` }
              nameTestId={ `${index}-card-name` }
              recipe={ recipe }
              recipeType={ pathname }
            />
          ))}
        </main>
      )}
    </div>
  );
}

export default Recipes;
