import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from 'react-router-dom';
// import { RecipesContext } from '../contexts/Contexts';
import useSuggestions from '../hooks/useSuggestions';

function SuggestedRecipe() {
  // const history = useHistory();
  const { pathname } = useLocation();
  const { suggestedRecipes, fetchSuggestions } = useSuggestions(pathname);
  // const { setIsNewRecipe } = useContext(RecipesContext);

  // const redirectToFood = (isMeal, id) => {
  //   if (!isMeal) {
  //     history.push(`/drinks/${id}`);
  //     return setIsNewRecipe({ type: 'drinks', recipeId: id });
  //   }
  //   setIsNewRecipe({ type: 'foods', recipeId: id });
  //   history.push(`/foods/${id}`);
  // };

  return (
    <div className="Suggestions-Container">
      {fetchSuggestions && (
        <Carousel>
          {suggestedRecipes.map((item, index) => (
            <Carousel.Item
              key={ item.idMeal || item.idDrink }
              data-testid={ `${index}-recomendation-card` }
              // onClick={ () => redirectToFood(item.idMeal, item.idMeal || item.idDrink) }
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
