import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>
        <label htmlFor="igredient-radio">
          <input
            type="radio"
            id="igredient-radio"
            data-testid="ingredient-search-radio"
          />
          Igredientes
        </label>
        <label htmlFor="search-radio">
          <input
            type="radio"
            id="search-radio"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-radio">
          <input
            type="radio"
            id="first-letter-radio"
            data-testid="first-letter-search-radio"
          />
          Primeira Letra
        </label>
        <button type="submit" data-testid="exec-search-btn">
          Pesquisar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
