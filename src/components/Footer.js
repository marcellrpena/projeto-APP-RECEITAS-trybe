import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const [drinksRedirect, setDrinksRedirect] = useState(false);
  const [mealsRedirect, setMealsRedirect] = useState(false);

  return (
    <footer style={ { position: 'fixed', bottom: '0px' } } data-testid="footer">
      <button
        type="button"
        data-testid="drinks-footer-btn"
        onClick={ () => setDrinksRedirect(true) }
      >
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        data-testid="meals-footer-btn"
        onClick={ () => setMealsRedirect(true) }
      >
        <img src={ mealIcon } alt="meal Icon" data-testid="food-bottom-btn" />
      </button>
      {drinksRedirect && <Redirect to="/drinks" />}
      {mealsRedirect && <Redirect to="/foods" />}
    </footer>
  );
}

export default Footer;
