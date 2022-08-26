import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { fetchRecipeDetails, fetchRecipes } from '../services/fetchRecipes';
import { addToFavorites } from '../services/saveStorage';
import RecipeCardDetails from '../components/RecipeCardDetails';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Recipes.css';

function RecipeDetails() {
  const [recipeDetail, setRecipeDetail] = useState({});
  const [recipeRecommends, setRecipeRecommends] = useState([]);
  const [fetchDetail, setFetchDetail] = useState(false);
  const [fetchRecommend, setFetchRecommend] = useState(false);
  const [isStartedRecipe, setIsStartedRecipe] = useState(false);
  const [isFinishedRecipe, setIsFinishedRecipe] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();

  const fetchRecommendations = async () => {
    const MAX_RECIPES = 6;
    const domain = pathname.includes('foods') ? 'drinks' : 'foods';
    const data = await fetchRecipes(domain);
    setRecipeRecommends(
      data.meals
        ? data.meals.slice(0, MAX_RECIPES)
        : data.drinks.slice(0, MAX_RECIPES),
    );
    setFetchRecommend(true);
  };

  const questIsStartedRecipe = () => {
    const localInProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    setIsStartedRecipe(
      !(
        !localInProgressRecipes
        || Object.keys(localInProgressRecipes).length === 0
      ),
    );
  };

  const questIsFinishedRecipe = () => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setIsFinishedRecipe(!(!localDoneRecipes || localDoneRecipes.length === 0));
  };

  const getRecipeDetail = async () => {
    const recipe = await fetchRecipeDetails(pathname, id);
    setRecipeDetail(recipe);
    fetchRecommendations();
    setFetchDetail(true);
  };

  const getFavorites = () => {
    const { idMeal, idDrink } = recipeDetail;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favorite = favoriteRecipes.some(
      (recipe) => recipe.id === idMeal || idDrink,
    );
    setIsFavorite(favorite);
  };

  useEffect(() => {
    getRecipeDetail();
    questIsStartedRecipe();
    questIsFinishedRecipe();
    getFavorites();
  }, [fetchDetail]);

  const copyLink = () => {
    clipboardCopy(window.location.href);
    setCopiedToClipboard(!copiedToClipboard);
  };

  const getEmbedId = () => {
    if (fetchDetail) return recipeDetail.strYoutube.split('watch?v=')[1];
  };

  const ingredientList = Object.entries(recipeDetail)
    .filter((item) => item[0].includes('strIngredient') && item[1])
    .filter((ingredient) => ingredient[1])
    .map((ingredient) => ingredient[1]);

  const measureList = Object.entries(recipeDetail)
    .filter((item) => item[0].includes('strMeasure') && item[1])
    .filter((measure) => measure[1])
    .map((measure) => measure[1]);

  const addRecipeToFavorites = (recipe) => {
    addToFavorites(recipe);
    setIsFavorite(!isFavorite);
  };

  return (
    <main className="Recipe-Details-Container">
      {fetchDetail && (
        <section className="Recipe-Container">
          <RecipeCardDetails
            imgTestId="recipe-photo"
            nameTestId="recipe-title"
            recipe={ recipeDetail }
            showCategory
          />
          <div className="Recipe-Buttons-Container">
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
              onClick={ () => addRecipeToFavorites(recipeDetail) }
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            >
              {isFavorite ? (
                <img src={ blackHeartIcon } alt="White heart icon" />
              ) : (
                <img src={ whiteHeartIcon } alt="White heart icon" />
              )}
            </button>
          </div>
          <div className="Ingredients-Container">
            {ingredientList.map((item, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item}: ${measureList[index]}`}
              </p>
            ))}
          </div>
          <div className="Instructions-Container">
            <p data-testid="instructions">{recipeDetail.strInstructions}</p>
          </div>
          {pathname.includes('/food') && (
            <div className="Video-Container">
              <iframe
                title={ recipeDetail.strMeal }
                frameBorder="0"
                data-testid="video"
                width="320"
                height="144"
                allowFullScreen
                src={ `https://www.youtube.com/embed/${getEmbedId()}` }
              />
            </div>
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
            onClick={ () => !isStartedRecipe && history.push(`${pathname}/in-progress`) }
            className="Start-Recipe-Btn"
          >
            {isStartedRecipe ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </section>
      )}
    </main>
  );
}

export default RecipeDetails;
