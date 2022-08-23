import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';

function RecipeDetails({ match }) {
  const [recipeDetail, setRecipeDetail] = useState({});
  const [recipeRecommends, setRecipeRecommends] = useState([]);
  const [isFetch, setIsFetch] = useState({ fetchDetail: false, fetchRecommend: false });

  console.log(recipeRecommends);

  const recipeId = match.params.id;
  const pagePath = match.path;

  const fetchRecipeDetails = async (domain) => {
    try {
      const response = await fetch(`https://www.${domain}.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      setRecipeDetail(data.meals ? data.meals[0] : data.drinks[0]);
      setIsFetch({ fetchDetail: true });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecommendations = async (domain) => {
    try {
      const response = await fetch(`https://www.${domain}.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      setRecipeRecommends(data.meals ? [...data.meals] : [...data.drinks]);
      setIsFetch({ fetchRecommend: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pagePath.includes('/food')) {
      fetchRecipeDetails('themealdb');
      fetchRecommendations('thecocktaildb');
    } else {
      fetchRecipeDetails('thecocktaildb');
      fetchRecommendations('themealdb');
    }
  }, []);

  const ingredientList = Object.entries(recipeDetail)
    .filter((item) => item[0].includes('strIngredient') && item[1] !== null)
    .filter((ingredient) => ingredient[1] !== '')
    .map((ingredient) => ingredient[1]);

  const measureList = Object.entries(recipeDetail)
    .filter((item) => item[0].includes('strMeasure') && item[1] !== null)
    .filter((measure) => measure[1] !== '')
    .map((measure) => measure[1]);

  return (
    <main>
      { isFetch.fetchDetail && (
        <section>
          <img
            data-testid="recipe-photo"
            src={ recipeDetail.strMealThumb || recipeDetail.strDrinkThumb }
            alt={ recipeDetail.strMeal || recipeDetail.strDrink }
          />

          <h1 data-testid="recipe-title">
            { recipeDetail.strMeal || recipeDetail.strDrink }
          </h1>

          <p
            data-testid="recipe-category"
          >
            { recipeDetail.strAlcoholic || recipeDetail.strCategory }
          </p>

          { ingredientList.map((item, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${item}: ${measureList[index]}` }
            </p>)) }

          <p data-testid="instructions">{ recipeDetail.strInstructions }</p>

          { pagePath.includes('/food') && (
            <iframe
              title={ recipeDetail.strMeal }
              data-testid="video"
              x-frame-options="sameorigin"
              src={ recipeDetail.strYoutube }
            />)}

          <p data-testid="0-recomendation-card">Recomendações</p>
        </section>)}
    </main>
  );
}

RecipeDetails.propTypes = {
  match: shape({
    params: shape({ id: string }),
    path: string,
  }).isRequired,
};

export default RecipeDetails;
