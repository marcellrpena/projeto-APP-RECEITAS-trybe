import React, { useContext } from 'react';
import { bool, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FaUser, FaSearch, FaHome } from 'react-icons/fa';
import { RecipesContext } from '../contexts/Contexts';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ name, showHomeBtn }) {
  const history = useHistory();

  const { isSearching, setIsSearching } = useContext(RecipesContext);
  const names = ['Profile', 'Done Recipes', 'Favorite Recipes'];
  return (
    <header className="Main-Header">
      <div
        className={ `Header-Informations ${isSearching ? 'Flat' : 'Rounded'}` }
      >
        {!names.includes(name) && (
          <div className="Header-Button">
            <button
              type="button"
              alt="Search Icon"
              data-testid="search-top-btn"
              onClick={ () => setIsSearching(!isSearching) }
            >
              <FaSearch />
            </button>
          </div>
        )}
        {showHomeBtn && (
          <FaHome
            style={ { fontSize: '2rem' } }
            onClick={ () => history.push('/foods') }
          />
        )}
        <h1 data-testid="page-title">{name}</h1>
        <div className="Header-Button">
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={ () => history.push('/profile') }
            alt="User icon"
          >
            <FaUser />
          </button>
        </div>
      </div>
      {isSearching && <SearchBar history={ history } />}
    </header>
  );
}

Header.defaultProps = { name: '', showHomeBtn: false };

Header.propTypes = { name: string, showHomeBtn: bool };

export default Header;
