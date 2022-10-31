import React from 'react';
import { shape, func, bool } from 'prop-types';
import { HiOutlineShare, HiShare } from 'react-icons/hi';
import '../styles/RecipesList.css';
import favoriteIcon from '../images/blackHeartIcon.svg';

function CreateRecipeList({
  recipesList, toRecipePage,
  favoriteBtn, useTags, shareRecipe, removeFavorite, isLinkToClipboard }) {
  return (
    <div>
      {
        recipesList.map(
          (
            {
              id,
              image,
              name,
              category,
              nationality,
              alcoholicOrNot,
              type,
              doneDate,
              tags,
            },
            index,
          ) => (
            <li key={ id } className="recipe">
              <button
                type="button"
                onClick={ () => toRecipePage(type, id) }
                className="recipe-img-btn"
              >
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                  className="recipe-img"
                />
              </button>
              <div className="recipe-info">
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${type === 'food' ? nationality : alcoholicOrNot
                  } - ${category}`}
                </p>
                <button
                  type="button"
                  onClick={ () => toRecipePage(type, id) }
                  className="recipe-title"
                >
                  <h3 data-testid={ `${index}-horizontal-name` }>
                    {name}
                  </h3>
                </button>
                {!favoriteBtn && (
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {`Done in: ${doneDate}`}
                  </p>
                )}
                <div className="tags">
                  {useTags
                    && tags.slice(0, 2).map((tag) => (
                      <p
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    ))}
                </div>
              </div>
              <div className="share-btn">
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="Share icon"
                  onClick={ () => shareRecipe(type, id) }
                >
                  {isLinkToClipboard[id] ? (
                    <HiShare />
                  ) : (
                    <HiOutlineShare />
                  )}
                </button>
                {favoriteBtn && (
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ favoriteIcon }
                    onClick={ () => removeFavorite(id) }
                  >
                    <img src={ favoriteIcon } alt="Favorite icon" />
                  </button>
                )}
              </div>
            </li>
          ),
        )
      }
    </div>
  );
}

CreateRecipeList.propTypes = {
  recipesList: shape([]),
  toRecipePage: func,
  shareRecipe: func,
  removeFavorite: func,
  useTags: bool,
  favoriteBtn: bool,
  isLinkToClipboard: shape({}),
}.isRequired;

export default CreateRecipeList;
