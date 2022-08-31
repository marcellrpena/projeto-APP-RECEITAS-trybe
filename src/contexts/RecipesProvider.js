import { node } from 'prop-types';
import React, { useState } from 'react';
import { RecipesContext } from './Contexts';

function RecipesProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [filterType, setFilterType] = useState('foods');
  const [recipes, setRecipes] = useState({
    meals: [],
    drinks: [],
  });
  const [categories, setCategories] = useState({
    meals: [],
    drinks: [],
  });

  const context = {
    recipes,
    setRecipes,
    categories,
    setCategories,
    isSearching,
    setIsSearching,
    filterType,
    setFilterType,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: node.isRequired,
};

export default RecipesProvider;
