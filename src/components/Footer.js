import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import '../styles/Footer.css';
import { RecipesContext } from '../contexts/Contexts';

function Footer() {
  const history = useHistory();
  const { filterType, setFilterType } = useContext(RecipesContext);
  return (
    <footer style={ { position: 'fixed', bottom: '0px' } } data-testid="footer">
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
            className={ filterType === 'drinks' ? 'Selected' : 'Unselected' }
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
            className={ filterType === 'foods' ? 'Selected' : 'Unselected' }
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
