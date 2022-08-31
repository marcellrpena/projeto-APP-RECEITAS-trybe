import React, { useContext, useEffect, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../contexts/Contexts';
import { fetchRecipesBy } from '../services/fetchRecipes';

function SearchBar() {
  const history = useHistory();
  const [userSearch, setUserSearch] = useState({
    filter: '',
    search: '',
  });

  const { recipes, setRecipes, setIsSearching } = useContext(RecipesContext);

  const handleChange = ({ target }) => setUserSearch({
    ...userSearch,
    [target.name]: target.value,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(false);
    const { pathname } = history.location;
    const recipeType = pathname.includes('foods') ? 'meals' : 'drinks';
    const recipesList = await fetchRecipesBy(pathname, userSearch);
    if (!recipesList) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else setRecipes({ ...recipes, [recipeType]: recipesList });
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

  useEffect(() => {
    const { meals, drinks } = recipes;
    if (meals.length === 1) history.push(`/foods/${meals[0].idMeal}`);
    if (drinks.length === 1) history.push(`/drinks/${drinks[0].idDrink}`);
  }, [recipes]);

  return (
    <div className="Search-Bar">
      <form onSubmit={ handleSubmit }>
        <div className="Filters-Container">
          <div className="mb-3">
            <Form.Check
              type="radio"
              name="filter"
              value="ingredient"
              label="Ingredient"
              id="ingredient-radio"
              data-testid="ingredient-search-radio"
              onChange={ handleChange }
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              name="filter"
              value="search"
              label="Name"
              id="search-radio"
              data-testid="name-search-radio"
              onChange={ handleChange }
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              name="filter"
              value="first-letter"
              label="First Letter"
              id="first-letter-radio"
              data-testid="first-letter-search-radio"
              onChange={ handleChange }
            />
          </div>
        </div>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Recipe"
            id="search-input"
            name="search"
            aria-label="Search Recipe"
            value={ userSearch.search }
            data-testid="search-input"
            onChange={ handleChange }
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button
          type="submit"
          variant="light"
          disabled={ !(userSearch.search && userSearch.filter) }
          data-testid="exec-search-btn"
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
