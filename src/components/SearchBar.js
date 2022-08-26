import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';
import { fetchRecipes } from '../services/fetchRecipes';

function SearchBar() {
  const history = useHistory();
  const [userSearch, setUserSearch] = useState({
    filter: '',
    search: '',
    type: '',
  });

  const { recipes, setRecipes } = useContext(RecipesContext);

  const handleChange = ({ target }) => {
    if (target.type === 'radio') {
      setUserSearch({
        ...userSearch,
        filter: target.value,
        type: target.id,
      });
    } else {
      setUserSearch({ ...userSearch, search: target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { filter, search, type } = userSearch;
    const { pathname } = history.location;
    const recipeType = pathname.includes('foods') ? 'meals' : 'drinks';
    const data = await fetchRecipes(pathname, type, filter, search);
    if (!data) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      const recipesList = data.meals ? data.meals : data.drinks;
      setRecipes({ ...recipes, [recipeType]: recipesList });
    }
  };

  useEffect(() => {
    const { filter, search } = userSearch;
    if (filter === 'byFirstLetter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setUserSearch({
        ...userSearch,
        search: search[0],
      });
    }
  }, [userSearch]);

  useEffect(() => {
    const { meals, drinks } = recipes;
    if (meals.length === 1) history.push(`/foods/${meals[0].idMeal}`);
    if (drinks.length === 1) history.push(`/drinks/${drinks[0].idDrink}`);
  }, [recipes]);

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
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="filter"
            value="byIngredient"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          Ingredients
        </label>
        <label htmlFor="search">
          <input
            type="radio"
            name="filter"
            value="bySearch"
            id="search"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            name="filter"
            value="byFirstLetter"
            id="first-letter"
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

export default SearchBar;
