import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';
import { fetchByFilter, fetchRecipesDidMount } from '../services/fetchRecipes';
import CategoryButton from './CategoryButton';
import RecipeCard from './RecipeCard';

function Recipes() {
  const history = useHistory();
  const { recipes, setRecipes, categories, setCategories } = useContext(RecipesContext);
  const { meals, drinks } = recipes;
  const { pathname } = history.location;

  useEffect(() => {
    const request = async () => {
      const response = await fetchRecipesDidMount(pathname);
      setRecipes({
        ...recipes,
        ...response.recipes,
      });
      setCategories({
        ...categories,
        ...response.categories,
      });
    };
    request();
  }, []);

  const handleClickFilter = async (category) => {
    const filter = await fetchByFilter(pathname, category);
    console.log(filter);
    setRecipes({
      ...recipes,
      ...filter,
    });
  };

  const handleClickAll = async () => {
    const response = await fetchRecipesDidMount(pathname);
    setRecipes({
      ...recipes,
      ...response.recipes,
    });
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
          && categoriesToRender.slice(0, MAX_CATEGORIES).map(({ strCategory }) => (
            <CategoryButton
              key={ strCategory }
              onClick={ () => handleClickFilter(strCategory) }
              categoryType={ strCategory }
              dataTestid={ `${strCategory}-category-filter` }
            />
          ))}
        <CategoryButton
          categoryType="All"
          onClick={ () => handleClickAll() }
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
