import { node } from 'prop-types';
import React, { useState } from 'react';
import { RecipesContext } from './Contexts';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const context = {
    recipes,
    setRecipes,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: node.isRequired,
};

export default RecipesProvider;
