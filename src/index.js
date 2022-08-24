import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LoginProvider from './contexts/LoginProvider';
import RecipesProvider from './contexts/RecipesProvider';

ReactDOM.render(
  <BrowserRouter>
    <LoginProvider>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </LoginProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
