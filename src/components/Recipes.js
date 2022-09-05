import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingIcons from 'react-loading-icons';
import { IoMdInfinite } from 'react-icons/io';
import { RecipesContext } from '../contexts/Contexts';
import {
  fetchByFilter,
  fetchRecipes,
  fetchCategories,
} from '../services/fetchRecipes';
import RecipeCard from './RecipeCard';

function Recipes() {
  const history = useHistory();
  const { recipes, categories, setRecipes, setCategories } = useContext(RecipesContext);
  const { meals, drinks } = recipes;
  const { pathname } = history.location;
  const [isLoading, setIsLoading] = useState(true);

  let categoryToFilter = '';

  const loadRecipes = async () => {
    const recipesData = await fetchRecipes(pathname);
    const categoriesData = await fetchCategories(pathname);
    setIsLoading(false);
    setRecipes({ ...recipes, ...recipesData });
    setCategories({ ...categories, ...categoriesData });
    categoryToFilter = '';
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleClickFilter = async (category) => {
    if (categoryToFilter === category) {
      categoryToFilter = '';
      return loadRecipes();
    }
    categoryToFilter = category;
    const filteredRecipes = await fetchByFilter(pathname, category);
    return setRecipes({ ...recipes, ...filteredRecipes });
  };

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;
  const recipesToRender = pathname.includes('foods') ? meals : drinks;
  const categoriesToRender = pathname.includes('foods')
    ? categories.meals
    : categories.drinks;

  return (
    <div className="Recipes-Container">
      {isLoading ? (
        <div className="Loading">
          <LoadingIcons.Puff stroke="#f45d01" />
        </div>
      ) : (
        <>
          <nav className="nav-filter-buttons">
            <button
              className="filter-btn"
              type="button"
              onClick={ () => loadRecipes() }
              data-testid="All-category-filter"
            >
              <IoMdInfinite size="50px" />
            </button>
            {categoriesToRender.length >= 1
              && categoriesToRender
                .slice(0, MAX_CATEGORIES)
                .map(({ strCategory }, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `${strCategory}-category-filter` }
                    onClick={ () => handleClickFilter(strCategory) }
                    className="filter-btn"
                  >
                    {strCategory}
                  </button>
                ))}
          </nav>
          {recipesToRender.length >= 1 && (
            <main>
              <section className="listed-recipes">
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
              </section>
            </main>
          )}
        </>
      )}
    </div>
  );
}

export default Recipes;
