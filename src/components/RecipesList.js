import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function RecipesList({ props: { key, useTags } }) {
  const [copyed, setCopyed] = useState(false);
  const [recipesList, setRecipesList] = useState([]);

  const history = useHistory();

  const localRecipes = JSON.parse(localStorage.getItem(key));

  const shareRecipe = (type, id) => {
    const link = `http://localhost:3000/${type === 'food' ? 'foods' : 'drinks'}/${id}`;
    clipboardCopy(link);
    setCopyed(true);
  };

  const filterRecipes = (filter) => {
    switch (filter) {
    case 'all':
      setRecipesList(localRecipes);
      break;
    case 'food':
      setRecipesList(localRecipes.filter((recipe) => recipe.type === 'food'));
      break;
    case 'drink':
      setRecipesList(localRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    default:
      setRecipesList(localRecipes);
      break;
    }
  };

  const ToRecipePage = (type, id) => history.push(
    `/${type === 'food' ? 'foods' : 'drinks'}/${id}`,
  );

  useEffect(() => {
    filterRecipes(undefined);
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
          {
            recipesList.map(({
              id,
              image,
              name,
              category,
              nationality,
              alcoholicOrNot,
              type,
              doneDate,
              tags },
            index) => (
              <li key={ id }>
                <button
                  type="button"
                  onClick={ () => ToRecipePage(type, id) }
                >
                  <img
                    src={ image }
                    alt={ name }
                    data-testid={ `${index}-horizontal-image` }
                    width="100"
                  />
                </button>

                <button
                  type="button"
                  onClick={ () => ToRecipePage(type, id) }
                >
                  <h1 data-testid={ `${index}-horizontal-name` }>
                    { name }
                  </h1>
                </button>

                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${type === 'food' ? nationality : alcoholicOrNot} - ${category}`}
                </p>

                <p data-testid={ `${index}-horizontal-done-date` }>
                  { doneDate }
                </p>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => shareRecipe(type, id) }
                >
                  <img src={ shareIcon } alt="Search icon" />
                </button>

                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ favoriteIcon }
                >
                  <img src={ favoriteIcon } alt="Favorite icon" />
                </button>

                { useTags && tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                ))}
              </li>
            ))
          }
        </ul>
        {copyed && (
          <div style={ { display: 'flex' } }>
            <p>Link copied!</p>
            <button
              type="button"
              onClick={ () => setCopyed(false) }
            >
              x
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default RecipesList;
