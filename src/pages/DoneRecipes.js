import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';

const dessertMeals = [
  {
    strMeal: 'Apple & Blackberry Crumble',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
    idMeal: '52893',
    tag: 'pasta',
  },
  {
    strMeal: 'Apple Frangipan Tart',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
    idMeal: '52768',
    tag: '1',
  },
  {
    strMeal: 'Bakewell tart',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg',
    idMeal: '52767',
    tag: '1',
  },
  {
    strMeal: 'Banana Pancakes',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
    idMeal: '52855',
    tag: '1',
  },
];
function DoneRecipes() {
  return (
    <>
      <Header name="Done Recipes" />
      <nav>
        <Button
          text="All"
          dataTestid="filter-by-all-btn"
          onClick={ () => {} }
        />
        <Button
          text="Food"
          dataTestid="filter-by-food-btn"
          onClick={ () => {} }
        />
        <Button
          text="Drinks"
          dataTestid="filter-by-drink-btn"
          onClick={ () => {} }
        />
        <main>
          <ul>
            {
              dessertMeals.map((recipe, index) => (
                <li key={ recipe.idMeal }>
                  <img
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    data-testid={ `${index}-horizontal-image` }
                    width="100"
                  />
                  <h1 data-testid={ `${index}-horizontal-name` }>
                    nome da receita pronta
                  </h1>
                  <h2 data-testid={ `${index}-horizontal-top-text` }>
                    {recipe.strMeal}
                  </h2>
                  <h4 data-testid={ `${index}-horizontal-done-date` }>
                    data que a receita foi feita
                  </h4>
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                  >
                    elemento que compartilha a receita
                  </button>
                  <h2 data-testid={ `${index}-${recipe.tag}-horizontal-tag ` }>
                    tag
                  </h2>
                </li>
              ))
            }
          </ul>
        </main>
      </nav>
    </>
  );
}

export default DoneRecipes;
