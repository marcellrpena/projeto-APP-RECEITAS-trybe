import React, { useState } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ name }) {
  const history = useHistory();

  const [isSearching, setIsSearching] = useState(false);
  const names = ['Profile', 'Done Recipes', 'Favorite Recipes'];
  return (
    <header>
      {!names.includes(name) && (
        <div>
          <button
            type="button"
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
            onClick={ () => setIsSearching(!isSearching) }
          >
            <img src={ searchIcon } alt="Search Icon" />
          </button>
        </div>
      )}
      <h1 data-testid="page-title">{name}</h1>
      <div>
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
          src={ profileIcon }
          alt="User icon"
        >
          <img src={ profileIcon } alt="User icon" />
        </button>
      </div>
      {isSearching && <SearchBar history={ history } />}
    </header>
  );
}

Header.defaultProps = { name: '' };

Header.propTypes = { name: string };

export default Header;
