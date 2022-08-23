import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';

function Content() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods/:id" />
      <Route path="/drinks/:id" />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/foods/:id/in-progress" />
      <Route path="/drinks/:id/in-progress" />
    </Switch>
  );
}

export default Content;
