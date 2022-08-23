import React, { useContext, useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { RecipesContext } from '../contexts/Contexts';
import fetchRecipesBy from '../services/fetchRecipes';

function SearchBar({ history }) {
  const [userSearch, setUserSearch] = useState({
    filter: '',
    search: '',
  });

  const { setRecipes } = useContext(RecipesContext);

  const handleChange = ({ target }) => setUserSearch({
    ...userSearch,
    [target.name]: target.value,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { pathname } = history.location;
    const TYPE = pathname.includes('foods') ? 'themealdb' : 'thecocktaildb';
    const recipes = await fetchRecipesBy(TYPE, userSearch);
    setRecipes(recipes);
  };

  useEffect(() => {
    const { filter, search } = userSearch;
    if (filter === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setUserSearch({
        ...userSearch,
        search: search[0],
      });
    }
  }, [userSearch]);

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="search"
          id="search-input"
          placeholder="Search Recipe"
          value={ userSearch.search }
          data-testid="search-input"
          onChange={ handleChange }
        />
        <label htmlFor="ingredient-radio">
          <input
            type="radio"
            name="filter"
            value="ingredient"
            id="ingredient-radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          Ingredients
        </label>
        <label htmlFor="search-radio">
          <input
            type="radio"
            name="filter"
            value="search"
            id="search-radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="first-letter-radio">
          <input
            type="radio"
            name="filter"
            value="first-letter"
            id="first-letter-radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
          First Letter
        </label>
        <button
          type="submit"
          disabled={ !(userSearch.search && userSearch.filter) }
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  history: shape({
    location: shape({ pathname: string }).isRequired,
  }).isRequired,
};

export default SearchBar;
