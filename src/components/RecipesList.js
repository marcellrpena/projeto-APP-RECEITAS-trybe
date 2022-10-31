import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { bool, shape, string } from 'prop-types';
import { BiDrink } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import { IoMdInfinite } from 'react-icons/io';
// import { HiOutlineShare, HiShare } from 'react-icons/hi';
import EmptyListMessage from './EmptyListMessage';
import CreateRecipeList from './createRecipeList';
// import favoriteIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipesList.css';

function RecipesList({ props: { key, useTags, favoriteBtn } }) {
  const history = useHistory();
  const [recipesList, setRecipesList] = useState([]);
  const [filterSelected, setFilterSelected] = useState({
    all: true,
    foods: false,
    drinks: false,
  });
  const [isLinkToClipboard, setIsLinkToClipboard] = useState({});
  const localRecipes = JSON.parse(localStorage.getItem(key)) || [];
  const getPath = (type) => (type === 'food' ? 'foods' : 'drinks');

  const shareRecipe = (type, id) => {
    const routeIdentifier = favoriteBtn ? 'favorite-recipes' : 'done-recipes';
    const domain = window.location.href.split(routeIdentifier)[0];
    const link = `${domain}${getPath(type)}/${id}`;
    clipboardCopy(link);
    setIsLinkToClipboard({ [id]: true });
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
    setRecipesList(newLocalRecipes);
    localStorage.setItem(key, JSON.stringify(newLocalRecipes));
  };

  useEffect(() => {
    filterRecipes();
  }, []);

  return (
    <section>
      <nav className="nav-filter-buttons fav-done-nav">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            filterRecipes('all');
            setFilterSelected({
              all: true,
              foods: false,
              drinks: false,
            });
          } }
          className="filter-btn"
          alt="Símbolo de infinito"
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
              drinks: false,
            });
          } }
          className="filter-btn"
          alt="Ícone de um prato de comida"
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
          alt="Ícone de um copo"
        >
          <BiDrink
            size="40px"
            color={ filterSelected.drinks ? '#003049' : '#EBEEF5' }
          />
        </button>
      </nav>
      <main className="Recipes-List-Container">
        <ul className="recipes-list">
          {recipesList.length === 0 ? (
            <EmptyListMessage />
          ) : (
            <CreateRecipeList
              recipesList={ recipesList }
              toRecipePage={ () => toRecipePage(type, id) }
              favoriteBtn={ favoriteBtn }
              useTags={ useTags }
              isLinkToClipboard={ isLinkToClipboard }
              shareRecipe={ () => shareRecipe(type, id) }
              removeFavorite={ () => removeFavorite(id) }
            />
          )}
        </ul>
      </main>
    </section>
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
