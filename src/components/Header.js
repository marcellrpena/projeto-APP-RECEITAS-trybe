import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';

function Header({ name, props: { history } }) {
  const [searchBar, setSearchBar] = useState(false);
  const names = ['Profile', 'Done Recipes', 'Favorite Recipes'];
  return (
    <header>
      <input
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
        src="src/images/profileIcon.svg"
        alt="profilePhoto"
      />
      <h1 data-testid="page-title">{name}</h1>
      {!names.includes(name) && (
        <div>
          <div>
            <button
              type="button"
              src={ searchIcon }
              alt="Search Icon"
              data-testid="search-top-btn"
              onClick={ () => setSearchBar(!searchBar) }
            >
              <img src={ searchIcon } alt="Search Icon" />
            </button>
          </div>
          {searchBar && <input type="text" data-testid="search-input" />}
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default Header;
