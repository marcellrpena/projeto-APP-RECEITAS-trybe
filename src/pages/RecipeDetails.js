import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { fetchRecipeDetails } from '../services/fetchRecipes';
import RecipeCardDetails from '../components/RecipeCardDetails';
import useSuggestions from '../hooks/useSuggestions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavorites from '../hooks/useFavorites';
import '../styles/Recipes.css';
import { startRecipe } from '../services/saveStorage';

function RecipeDetails() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { suggestedRecipes, fetchSuggestions } = useSuggestions([], pathname);
  const { isFavorite, addRecipeToFavorites } = useFavorites(
    false,
    id,
    pathname,
  );
  const [recipeDetail, setRecipeDetail] = useState({});
  const [fetchDetail, setFetchDetail] = useState(false);
  const [isStartedRecipe, setIsStartedRecipe] = useState(false);
  const [isFinishedRecipe, setIsFinishedRecipe] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

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
    setFetchDetail(true);
  };

  useEffect(() => {
    getRecipeDetail();
    questIsStartedRecipe();
    questIsFinishedRecipe();
  }, [fetchDetail]);

  const copyLink = () => {
    clipboardCopy(window.location.href);
    setCopiedToClipboard(!copiedToClipboard);
  };

  const getEmbedId = () => {
    if (fetchDetail) return recipeDetail.strYoutube.split('watch?v=')[1];
  };

  const ingredientList = Object.entries(recipeDetail).reduce((acc, curr) => {
    if (curr[0].includes('strIngredient') && curr[1]) {
      acc = [...acc, curr[1]];
    }
    return acc;
  }, []);

  const measureList = Object.entries(recipeDetail).reduce((acc, curr) => {
    if (curr[0].includes('strMeasure') && curr[1]) {
      acc = [...acc, curr[1]];
    }
    return acc;
  }, []);

  const startNewRecipe = () => {
    const recipeType = pathname.includes('foods') ? 'meals' : 'cocktails';
    startRecipe(id, recipeType);
    history.push(`${pathname}/in-progress`);
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
          {fetchSuggestions && (
            <div className="Recommendations-Container">
              {suggestedRecipes.map((item, index) => (
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
            onClick={ startNewRecipe }
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
