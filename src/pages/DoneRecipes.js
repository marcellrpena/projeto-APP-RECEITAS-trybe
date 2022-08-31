import React from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function DoneRecipes() {
  return (
    <div className="done-recipes">
      <Header name="Done Recipes" />
      <RecipesList
        props={ {
          key: 'doneRecipes',
          useTags: true,
          favoriteBtn: false,
        } }
      />
    </div>
  );
}

export default DoneRecipes;
