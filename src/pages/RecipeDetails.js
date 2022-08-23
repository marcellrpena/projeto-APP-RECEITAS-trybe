import React, { useEffect, useState } from 'react';

function RecipeDetails(props) {
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [recipeRecommends, setRecipeRecommends] = useState([]);
  const [isFetch, setIsFetch] = useState(false);

  const recipeId = props.match.params.id;
  const pagePath = props.match.path;

  const fetchRecipeDetails = async (domain) => {
    try {
      console.log('teste');
      const response = await fetch(`https://www.${domain}.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      setRecipeDetail(data);
      setIsFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

//   const fetchRecommendations = async (domain) => {
//     try {
//       const response = await fetch(`https://www.${domain}.com/api/json/v1/1/lookup.php?i=`);
//       const data = await response.json();
//       setRecipeRecommends(data);
//     //   setIsFetch(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  useEffect(() => {
    if (pagePath.includes('/food')) {
      fetchRecipeDetails('themealdb');
    //   fetchRecommendations('thecocktaildb');
    } else {
      fetchRecipeDetails('thecocktaildb');
    //   fetchRecommendations('themealdb');
    }

    // fetchRecipeDetails();
  }, []);

//   isFetch && console.log(recipeDetail.meals[0].strMealThumb);
  return (
    <main>
      { isFetch && (
        <section>
          <img
            data-testid="recipe-photo"
            src={ recipeDetail.meals[0].strMealThumb }
            alt={ recipeDetail.meals[0].strMeal }
          />

          {/* <h1 data-testid="recipe-title">{ recipeDetail.strMeal }</h1> */}

          {/* <p data-testid="recipe-category">{ recipeDetail[0].strCategory }</p>

          { Object.entries(recipeDetail[0]).filter((item, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { item[0].match('strIngredient') && item[1] }
            </p>)) }

          <p data-testid="instructions">{ recipeDetail[0].strInstructions }</p>

          { pagePath.includes('/food') && (
            <iframe
              title={ recipeDetail[0].strMeal }
              width="420"
              height="345"
              data-testid="video"
              src={ recipeDetail[0].strYoutube }
            />)}

          <p data-testid="${index}-recomendation-card">Recomendações</p> */}
        </section>)}
    </main>
  );
}

export default RecipeDetails;
