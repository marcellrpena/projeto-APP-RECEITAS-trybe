import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRecipesDidMount } from '../services/fetchRecipes';
import { RecipesContext } from './Contexts';

function RecipesProvider({ children }) {
  const history = useHistory();
  const [recipes, setRecipes] = useState({
    meals: [],
    drinks: [],
  });
  const [categories, setCategories] = useState({
    meals: [],
    drinks: [],
  });

  const { pathname } = history.location;

  const loadRecipes = async () => {
    const response = await fetchRecipesDidMount(pathname);
    setRecipes({
      ...recipes,
      ...response.recipes,
    });
    setCategories({
      ...categories,
      ...response.categories,
    });
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const context = {
    recipes,
    setRecipes,
    categories,
    setCategories,
    loadRecipes,
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
