import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';

import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [copyed, setCopyed] = useState(false);
  const [recipesList, setRecipesList] = useState([]);

  const getPath = (type) => (type === 'food' ? 'foods' : 'drinks');

  const history = useHistory();
  const shareRecipe = (type, id) => {
    const domain = window.location.href.split('/done-recipes')[0];
    const link = `${domain}${getPath(type)}/${id}`;
    clipboardCopy(link);
    setCopyed(true);
  };

  const filterRecipes = (filter) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (filter === 'food') {
      setRecipesList(doneRecipes.filter(({ type }) => type === 'food'));
    }
    if (filter === 'drink') {
      setRecipesList(doneRecipes.filter(({ type }) => type === 'drink'));
    }
    return setRecipesList(doneRecipes);
  };

  const toRecipePage = (type, id) => history.push(`/${getPath(type)}/${id}`);

  useEffect(() => {
    filterRecipes();
  }, []);

  return (
    <div>
      <Header name="Done Recipes" />
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

                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {doneDate}
                  </p>

                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => shareRecipe(type, id) }
                  >
                    <img src={ shareIcon } alt="search icon" />
                  </button>

                  {tags.map((tag) => (
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
      </nav>
    </div>
  );
}

export default DoneRecipes;
