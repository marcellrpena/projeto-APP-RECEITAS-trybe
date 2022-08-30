import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer style={ { position: 'fixed', bottom: '0px' } } data-testid="footer">
      <button
        type="button"
        data-testid="drinks-footer-btn"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        data-testid="meals-footer-btn"
        onClick={ () => history.push('/foods') }
      >
        <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
