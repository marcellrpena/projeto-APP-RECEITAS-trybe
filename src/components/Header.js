import React from 'react';
import PropTypes from 'prop-types';

function Header({ name }) {
  const names = ['Profile', 'Done Recipes', 'Favorite Recipes'];
  return (
    <header>
      <img
        data-testid="profile-top-btn"
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
          <img
            data-testid="search-top-btn"
            src="src/images/searchIcon.svg"
            alt="SearchIcon"
          />
        )
      }
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default Header;
