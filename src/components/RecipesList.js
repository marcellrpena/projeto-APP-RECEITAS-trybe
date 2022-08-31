import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { bool, shape, string } from 'prop-types';
import { BiDrink } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import { IoMdInfinite } from 'react-icons/io';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipesList.css';

function RecipesList({ props: { key, useTags, favoriteBtn } }) {
  const history = useHistory();
  const [copyed, setCopyed] = useState(false);
  const [recipesList, setRecipesList] = useState([]);
  const [filterSelected, setFilterSelected] = useState({
    all: true,
    foods: false,
    drinks: false,
  });

  const localRecipes = JSON.parse(localStorage.getItem(key)) || [];
  const getPath = (type) => (type === 'food' ? 'foods' : 'drinks');

  const shareRecipe = (type, id) => {
    const routeIdentifier = favoriteBtn ? 'favorite-recipes' : 'done-recipes';
    const domain = window.location.href.split(routeIdentifier)[0];
    const link = `${domain}${getPath(type)}/${id}`;
    clipboardCopy(link);
    setCopyed(true);
  };

  const applyFilter = (recipeType) => (
    localRecipes.filter(({ type }) => type === recipeType));

  const filterRecipes = (filter) => {
    const doneRecipes = localRecipes;
    if (filter === 'food') return setRecipesList(applyFilter('food'));
    if (filter === 'drink') return setRecipesList(applyFilter('drink'));
    return setRecipesList(doneRecipes);
  };

  const toRecipePage = (type, id) => history.push(`/${getPath(type)}/${id}`);

  const removeFavorite = (id) => {
    const newLocalRecipes = recipesList.filter((recipe) => recipe.id !== id);
    console.log(newLocalRecipes);
    setRecipesList(newLocalRecipes);
    localStorage.setItem(key, JSON.stringify(newLocalRecipes));
  };

  useEffect(() => {
    filterRecipes();
  }, []);

  return (
    <>
      <nav className="nav-filter-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            filterRecipes('all');
            setFilterSelected({
              all: true,
              foods: false,
              drinks: false });
          } }
          className="filter-btn"
        >
          <IoMdInfinite
            size="40px"
            color={ filterSelected.all ? '#003049' : '#EBEEF5' }
          />
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            filterRecipes('food');
            setFilterSelected({
              all: false,
              foods: true,
              drinks: false });
          } }
          className="filter-btn"
        >
          <GiMeal
            size="40px"
            color={ filterSelected.foods ? '#003049' : '#EBEEF5' }
          />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            filterRecipes('drink');
            setFilterSelected({
              all: false,
              foods: false,
              drinks: true,
            });
          } }
          className="filter-btn"
        >
          <BiDrink
            size="40px"
            color={ filterSelected.drinks ? '#003049' : '#EBEEF5' }
          />
        </button>
      </nav>
      <main>
        <ul className="recipes-list">
          {recipesList.map(
            (
              {
                id,
                image,
                name,
                category,
                nationality,
                alcoholicOrNot,
                type,
                doneDate,
                tags,
              },
              index,
            ) => (
              <li key={ id } className="recipe">
                <button
                  type="button"
                  onClick={ () => toRecipePage(type, id) }
                  className="recipe-img-btn"
                >
                  <img
                    src={ image }
                    alt={ name }
                    data-testid={ `${index}-horizontal-image` }
                    className="recipe-img"
                  />
                </button>
                <div className="recipe-info">
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${
                      type === 'food' ? nationality : alcoholicOrNot
                    } - ${category}`}
                  </p>
                  <button
                    type="button"
                    onClick={ () => toRecipePage(type, id) }
                    className="recipe-title"
                  >
                    <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                  </button>

                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {`Done in: ${doneDate}`}
                  </p>

                  <div className="tags">
                    {useTags
                  && tags.map((tag) => (
                    <p
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </p>
                  ))}
                  </div>
                </div>

                <div className="share-btn">
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => shareRecipe(type, id) }
                  >
                    <img src={ shareIcon } alt="Search icon" />
                  </button>

                  {favoriteBtn && (
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ favoriteIcon }
                      onClick={ () => removeFavorite(id) }
                    >
                      <img src={ favoriteIcon } alt="Favorite icon" />
                    </button>
                  )}
                </div>
              </li>
            ),
          )}
        </ul>
        {copyed && (
          <div style={ { display: 'flex' } }>
            <p>Link copied!</p>
            <button type="button" onClick={ () => setCopyed(false) }>
              x
            </button>
          </div>
        )}
      </main>
    </>
  );
}

RecipesList.propTypes = {
  props: shape({
    key: string,
    useTags: bool,
    favoriteBtn: bool,
  }).isRequired,
};

export default RecipesList;
