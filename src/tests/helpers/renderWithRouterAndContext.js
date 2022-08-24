import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import LoginProvider from '../../contexts/LoginProvider';
import RecipesProvider from '../../contexts/RecipesProvider';

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        <LoginProvider>
          <RecipesProvider>{component}</RecipesProvider>
        </LoginProvider>
      </Router>
    ),
    history,
  };
};

export default renderWithRouterAndContext;
