import React from 'react';

import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function FavoriteRecipes() {
  return (
    <>
      <Header name="Favorite Recipes" />
      <RecipesList
        props={ {
          key: 'favoriteRecipes',
          useTags: false,
        } }
      />
    </>
  );
}

export default FavoriteRecipes;
