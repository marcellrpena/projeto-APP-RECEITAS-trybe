import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { bool, shape, string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function RecipesList({ props: { key, useTags, favoriteBtn } }) {
  const history = useHistory();
  const [copyed, setCopyed] = useState(false);
  const [recipesList, setRecipesList] = useState([]);

  const localRecipes = JSON.parse(localStorage.getItem(key)) || [];
  const getPath = (type) => (type === 'food' ? 'foods' : 'drinks');

  const shareRecipe = (type, id) => {
    const routeIdentifier = favoriteBtn ? 'favorite-recipes' : 'done-recipes';
    const domain = window.location.href.split(routeIdentifier)[0];
    const link = `${domain}${getPath(type)}/${id}`;
    clipboardCopy(link);
    setCopyed(true);
  };

  const applyFilter = (recipeType) => (
    localRecipes.filter(({ type }) => type === recipeType));

  const filterRecipes = (filter) => {
    const doneRecipes = localRecipes;
    if (filter === 'food') return setRecipesList(applyFilter('food'));
    if (filter === 'drink') return setRecipesList(applyFilter('drink'));
    return setRecipesList(doneRecipes);
  };

  const toRecipePage = (type, id) => history.push(`/${getPath(type)}/${id}`);

  const removeFavorite = (id) => {
    const newLocalRecipes = recipesList.filter((recipe) => recipe.id !== id);
    console.log(newLocalRecipes);
    setRecipesList(newLocalRecipes);
    localStorage.setItem(key, JSON.stringify(newLocalRecipes));
  };

  useEffect(() => {
    filterRecipes();
  }, []);

  return (
    <>
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          Drink
        </button>
      </nav>
      <main>
        <ul>
          {recipesList.map(
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
              <li key={ id }>
                <button type="button" onClick={ () => toRecipePage(type, id) }>
                  <img
                    src={ image }
                    alt={ name }
                    data-testid={ `${index}-horizontal-image` }
                    width="100"
                  />
                </button>
                <button type="button" onClick={ () => toRecipePage(type, id) }>
                  <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
                </button>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${
                    type === 'food' ? nationality : alcoholicOrNot
                  } - ${category}`}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => shareRecipe(type, id) }
                >
                  <img src={ shareIcon } alt="Search icon" />
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
                {useTags
                  && tags.map((tag) => (
                    <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                      {tag}
                    </p>
                  ))}
              </li>
            ),
          )}
        </ul>
        {copyed && (
          <div style={ { display: 'flex' } }>
            <p>Link copied!</p>
            <button type="button" onClick={ () => setCopyed(false) }>
              x
            </button>
          </div>
        )}
      </main>
    </>
  );
}

RecipesList.propTypes = {
  props: shape({
    key: string,
    useTags: bool,
    favoriteBtn: bool,
  }).isRequired,
};

export default RecipesList;
