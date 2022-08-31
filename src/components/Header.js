import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FaUser, FaSearch } from 'react-icons/fa';
import { RecipesContext } from '../contexts/Contexts';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ name }) {
  const history = useHistory();

  const { isSearching, setIsSearching } = useContext(RecipesContext);
  // const [isSearching, setIsSearching] = useState(false);
  const names = ['Profile', 'Done Recipes', 'Favorite Recipes'];
  return (
    <header className={ isSearching ? 'Rounded' : '' }>
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

Header.defaultProps = { name: '' };

Header.propTypes = { name: string };

export default Header;
