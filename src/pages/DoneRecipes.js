import React from 'react';

import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function DoneRecipes() {
  return (
    <>
      <Header name="Done Recipes" />
      <RecipesList
        props={ {
          key: 'doneRecipes',
          useTags: true,
          favoriteBtn: false,
        } }
      />
    </>
  );
}

export default DoneRecipes;
