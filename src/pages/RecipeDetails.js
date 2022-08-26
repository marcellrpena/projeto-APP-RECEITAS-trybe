import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { shape, string } from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import RecipeCardDetails from '../components/RecipeCardDetails';
import { addToFavorites } from '../services/saveStorage';
import shareIcon from '../images/shareIcon.svg';
import '../styles/Recipes.css';
import { fetchRecipeDetails } from '../services/fetchRecipes';

function RecipeDetails({ match }) {
  const [recipeDetail, setRecipeDetail] = useState({});
  const [recipeRecommends, setRecipeRecommends] = useState([]);
  const [fetchDetail, setFetchDetail] = useState(false);
  const [fetchRecommend, setFetchRecommend] = useState(false);
  const [isStartedRecipe, setIsStartedRecipe] = useState(false);
  const [isFinishedRecipe, setIsFinishedRecipe] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const recipeId = match.params.id;
  const pagePath = match.path;

  const fetchRecommendations = async (domain) => {
    const MAX_RECIPES = 5;
    const type = domain.includes('foods') ? 'cocktail' : 'meal';
    try {
      const response = await fetch(
        `https://www.the${type}db.com/api/json/v1/1/search.php?s=`,
      );
      const data = await response.json();
      setRecipeRecommends(
        data.meals
          ? data.meals.slice(0, MAX_RECIPES)
          : data.drinks.slice(0, MAX_RECIPES),
      );
      setFetchRecommend(true);
    } catch (error) {
      return error;
    }
  };

  const questIsStartedRecipe = () => {
    const localInProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    setIsStartedRecipe(
      !(
        localInProgressRecipes === null
        || Object.keys(localInProgressRecipes).length === 0
      ),
    );
  };

  const questIsFinishedRecipe = () => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setIsFinishedRecipe(
      !(localDoneRecipes === null || localDoneRecipes.length === 0),
    );
  };

  const getRecipeDetail = async () => {
    const recipe = await fetchRecipeDetails(location.pathname, recipeId);
    setRecipeDetail(recipe);
    fetchRecommendations(location.pathname);
    setFetchDetail(true);
  };

  useEffect(() => {
    getRecipeDetail();
    questIsStartedRecipe();
    questIsFinishedRecipe();
  }, []);

  const ingredientList = Object.entries(recipeDetail)
    .filter((item) => item[0].includes('strIngredient') && item[1] !== null)
    .filter((ingredient) => ingredient[1] !== '')
    .map((ingredient) => ingredient[1]);

  const measureList = Object.entries(recipeDetail)
    .filter((item) => item[0].includes('strMeasure') && item[1] !== null)
    .filter((measure) => measure[1] !== '')
    .map((measure) => measure[1]);

  const copyLink = () => {
    clipboardCopy(window.location.href);
    setCopiedToClipboard(!copiedToClipboard);
  };

  return (
    <main>
      {fetchDetail && (
        <section>
          <RecipeCardDetails
            imgTestId="recipe-photo"
            nameTestId="recipe-title"
            recipe={ recipeDetail }
            showCategory
          />
          <div>
            {copiedToClipboard ? (
              <span>Link copied!</span>
            ) : (
              <button type="button" data-testid="share-btn" onClick={ copyLink }>
                <img src={ shareIcon } alt="Share icon" />
              </button>
            )}
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => addToFavorites(recipeDetail) }
            >
              Favorite
            </button>
          </div>
          {ingredientList.map((item, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${item}: ${measureList[index]}`}
            </p>
          ))}
          <p data-testid="instructions">{recipeDetail.strInstructions}</p>
          {pagePath.includes('/food') && (
            <iframe
              title={ recipeDetail.strMeal }
              frameBorder="0"
              data-testid="video"
              width="320"
              height="144"
              src={ recipeDetail.strYoutube }
            />
          )}
          {fetchRecommend && (
            <div className="Recommendations-Container">
              {recipeRecommends.map((item, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                  className="Recommended-Recipe"
                >
                  <p data-testid={ `${index}-recomendation-title` }>
                    {item.strDrink || item.strMeal}
                  </p>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            data-testid="start-recipe-btn"
            disabled={ isFinishedRecipe }
            onClick={ () => !isStartedRecipe && history.push(`${match.url}/in-progress`) }
            className="Start-Recipe-Btn"
          >
            {isStartedRecipe ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </section>
      )}
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
