import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
      <h1
        data-testid="page-title"
      >
        {name}
      </h1>
      {
        !names.includes(name) && (
          <div>
            <input
              type="button"
              data-testid="search-top-btn"
              src="src/images/searchIcon.svg"
              alt="SearchIcon"
              onClick={ () => setSearchBar(!searchBar) }
            />
            {
              searchBar && (<input
                type="text"
                data-testid="search-input"
              />)
            }
          </div>
        )
      }
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default Header;
