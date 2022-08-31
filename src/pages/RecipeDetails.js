import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { HiOutlineHeart, HiHeart, HiOutlineShare } from 'react-icons/hi';
import {
  getDoneRecipes,
  getRecipesInProgress,
  startRecipe,
} from '../services/saveStorage';
import SuggestedRecipe from '../components/SuggestedRecipe';
import RecipeCardDetails from '../components/RecipeCardDetails';
import useFavorites from '../hooks/useFavorites';
import useRecipe from '../hooks/useRecipe';
import '../styles/Recipes.css';
import '../styles/RecipeDetails.css';
import { RecipesContext } from '../contexts/Contexts';
import { fetchRecipeDetails } from '../services/fetchRecipes';

function RecipeDetails() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { isFavorite, addRecipeToFavorites } = useFavorites(
    false,
    id,
    pathname,
  );
  const { isNewRecipe } = useContext(RecipesContext);
  const { recipe, isFetched, ingredients,
    measures, setRecipe } = useRecipe(pathname, id);
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
    const renderNewRecipe = async () => {
      const getRecipe = await fetchRecipeDetails(pathname, id);
      setRecipe(getRecipe);
    };
    // precisa arrumar logica para renderizar a nova receita se clicar pelas recomendadas
    renderNewRecipe();
    questIsStartedRecipe();
    questIsFinishedRecipe();
  }, [isNewRecipe]);

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
        <>
          <section className="recipe-Details">
            <RecipeCardDetails
              imgTestId="recipe-photo"
              nameTestId="recipe-title"
              recipe={ recipe }
              showCategory
            />
            <div className="title-share-favorite">
              <h2 className="title" data-testid="recipe-title">
                {recipe.strMeal || recipe.strDrink}
              </h2>
            </div>
            <div className="btn-shareAndfavorite-position">
              <button
                className="btn-share-favorite"
                type="button"
                data-testid="share-btn"
                onClick={ copyLink }
                alt="Share icon"
              >
                <HiOutlineShare />
              </button>
              <button
                className="btn-share-favorite"
                type="button"
                data-testid="favorite-btn"
                onClick={ () => addRecipeToFavorites(recipe) }
              >
                {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
              </button>
            </div>
            <div className="span-category">
              <p className="category" data-testid="recipe-category">
                {recipe.strAlcoholic || recipe.strCategory}
              </p>
              {copiedToClipboard && <p className="span-copied">Link copied!</p>}
            </div>
            <h4 className="title-ingredients">Ingredients</h4>
            <div className="ingredient-list">
              {ingredients.map((item, index) => (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  className="ingredient-check margin-zero"
                >
                  {`${item}${measures[index] ? `: ${measures[index]}` : ''}`}
                </p>
              ))}
            </div>
            <h4 className="title-instructions">Instructions</h4>
            <div className="instructions-text">
              <p data-testid="instructions" className="text-style">
                {recipe.strInstructions}
              </p>
            </div>
            <button
              type="button"
              data-testid="start-recipe-btn"
              disabled={ isFinishedRecipe }
              onClick={ startNewRecipe }
              className="btn btn-secondary btn-login"
            >
              {isStartedRecipe ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          </section>
          <section className="Side-Content">
            {pathname.includes('/food') && (
              <div className="video-style">
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
            <SuggestedRecipe />
          </section>
        </>
      )}
    </main>
  );
}

export default RecipeDetails;
