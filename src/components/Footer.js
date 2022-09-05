import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import { MdFactCheck } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import '../styles/Footer.css';
import { RecipesContext } from '../contexts/Contexts';

function Footer() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { setFilterType } = useContext(RecipesContext);
  return (
    <footer style={ { position: 'fixed', bottom: '0px' } } data-testid="footer">
      <div className="Footer-Button">
        <button
          type="button"
          alt="Check List icon"
          data-testid="done-recipes-bottom-btn"
          className="Aside-Icon"
          onClick={ () => history.push('/done-recipes') }
        >
          <MdFactCheck />
        </button>
      </div>
      <div className="Footer-Button">
        <button
          type="button"
          name="drinks"
          data-testid="drinks-footer-btn"
          alt="Drink Icon"
          onClick={ () => {
            history.push('/drinks');
            setFilterType('drinks');
          } }
        >
          <BiDrink
            data-testid="drinks-bottom-btn"
            className={ pathname.includes('drinks') ? 'Selected' : 'Unselected' }
          />
        </button>
      </div>
      <div className="Footer-Button">
        <button
          type="button"
          name="foods"
          data-testid="meals-footer-btn"
          alt="Meal Icon"
          onClick={ () => {
            history.push('/foods');
            setFilterType('foods');
          } }
        >
          <GiMeal
            data-testid="food-bottom-btn"
            className={ pathname.includes('foods') ? 'Selected' : 'Unselected' }
          />
        </button>
      </div>
      <div className="Footer-Button">
        <button
          type="button"
          alt="Star Icon"
          data-testid="favorites-bottom-btn"
          className="Aside-Icon"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <AiFillStar />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
