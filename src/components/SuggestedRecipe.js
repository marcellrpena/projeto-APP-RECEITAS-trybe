import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from 'react-router-dom';
// import { RecipesContext } from '../contexts/Contexts';
import useSuggestions from '../hooks/useSuggestions';

function SuggestedRecipe() {
  const { pathname } = useLocation();
  const { suggestedRecipes, fetchSuggestions } = useSuggestions(pathname);

  return (
    <div className="Suggestions-Container">
      <h2>Suggestions</h2>
      {fetchSuggestions && (
        <Carousel>
          {suggestedRecipes.map((item, index) => (
            <Carousel.Item
              key={ item.idMeal || item.idDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="d-block w-100"
                src={ item.strMealThumb || item.strDrinkThumb }
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 data-testid={ `${index}-recomendation-title` }>
                  {item.strMeal || item.strDrink}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default SuggestedRecipe;
