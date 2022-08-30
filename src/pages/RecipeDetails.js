import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import {
  getDoneRecipes,
  getRecipesInProgress,
  startRecipe,
} from '../services/saveStorage';
import RecipeCardDetails from '../components/RecipeCardDetails';
import useSuggestions from '../hooks/useSuggestions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavorites from '../hooks/useFavorites';
import useRecipe from '../hooks/useRecipe';
import '../styles/Recipes.css';

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
  const { recipe, isFetched, ingredients, measures } = useRecipe(pathname, id);
  const [isStartedRecipe, setIsStartedRecipe] = useState(false);
  const [isFinishedRecipe, setIsFinishedRecipe] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const questIsStartedRecipe = () => {
    const recipesInProgress = getRecipesInProgress();
    const type = pathname.includes('foods') ? 'meals' : 'cocktails';
    setIsStartedRecipe(!!recipesInProgress[type][id]);
  };

  const questIsFinishedRecipe = () => {
    const doneRecipes = getDoneRecipes();
    setIsFinishedRecipe(doneRecipes.some((doneRecipe) => doneRecipe.id === id));
  };

  useEffect(() => {
    questIsStartedRecipe();
    questIsFinishedRecipe();
  }, []);

  const copyLink = () => {
    clipboardCopy(window.location.href);
    setCopiedToClipboard(!copiedToClipboard);
  };

  const getEmbedId = () => {
    if (isFetched) return recipe.strYoutube.split('watch?v=')[1];
  };

  const startNewRecipe = () => {
    const recipeType = pathname.includes('foods') ? 'meals' : 'cocktails';
    startRecipe(id, recipeType);
    history.push(`${pathname}/in-progress`);
  };

  return (
    <main className="Recipe-Details-Container">
      {isFetched && (
        <section className="Recipe-Container">
          <RecipeCardDetails
            imgTestId="recipe-photo"
            nameTestId="recipe-title"
            recipe={ recipe }
            showCategory
          />
          <div className="Recipe-Buttons-Container">
            {copiedToClipboard && <span>Link copied!</span>}
            <button type="button" data-testid="share-btn" onClick={ copyLink }>
              <img src={ shareIcon } alt="Share icon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => addRecipeToFavorites(recipe) }
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            >
              {isFavorite ? (
                <img src={ blackHeartIcon } alt="Black heart icon" />
              ) : (
                <img src={ whiteHeartIcon } alt="White heart icon" />
              )}
            </button>
          </div>
          <div className="Ingredients-Container">
            {ingredients.map((item, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item}${measures[index] ? `: ${measures[index]}` : ''}`}
              </p>
            ))}
          </div>
          <div className="Instructions-Container">
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
          {pathname.includes('/food') && (
            <div className="Video-Container">
              <iframe
                title={ recipe.strMeal }
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
