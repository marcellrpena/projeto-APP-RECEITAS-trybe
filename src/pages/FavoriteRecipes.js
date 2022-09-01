import React from 'react';

import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function FavoriteRecipes() {
  return (
    <>
      <Header name="Favorite Recipes" showHomeBtn />
      <RecipesList
        props={ {
          key: 'favoriteRecipes',
          useTags: false,
          favoriteBtn: true,
        } }
      />
    </>
  );
}

export default FavoriteRecipes;
