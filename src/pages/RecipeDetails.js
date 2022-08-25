import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

function RecipeDetails({ match }) {
  const [recipeDetail, setRecipeDetail] = useState({});
  const [recipeRecommends, setRecipeRecommends] = useState([]);
  const [fetchDetail, setFetchDetail] = useState(false);
  const [fetchRecommend, setFetchRecommend] = useState(false);

  console.log(recipeRecommends);

  const recipeId = match.params.id;
  const pagePath = match.path;

  const fetchRecipeDetails = async (domain) => {
    try {
      const response = await fetch(`https://www.${domain}.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      setRecipeDetail(data.meals ? data.meals[0] : data.drinks[0]);
      setFetchDetail(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecommendations = async (domain) => {
    try {
      const response = await fetch(`https://www.${domain}.com/api/json/v1/1/search.php?s=`);
      const data = await response.json();
      setRecipeRecommends(data.meals ? [
        data.meals[0],
        data.meals[1],
        data.meals[2],
        data.meals[3],
        data.meals[4],
        data.meals[5],
      ] : [
        data.drinks[0],
        data.drinks[1],
        data.drinks[2],
        data.drinks[3],
        data.drinks[4],
        data.drinks[5],
      ]);
      setFetchRecommend(true);
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
      { fetchDetail && (
        <section>
          <img
            style={ { width: '250px' } }
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
              frameBorder="0"
              data-testid="video"
              width="320"
              height="144"
              x-frame-options="sameorigin"
              src={ recipeDetail.strYoutube }
            />)}

          { fetchRecommend && (
            <div
              style={ {
                display: 'flex',
                width: '200px',
                border: '1px solid red',
                overflow: 'scroll',
              } }
            >
              { recipeRecommends.map((item, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                  style={ {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '100px',
                    border: '1px solid red',
                    padding: '10px',
                  } }
                >
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { item.strDrink || item.strMeal }
                  </p>
                </div>
              )) }
            </div>
          ) }
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
