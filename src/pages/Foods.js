import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Foods(props) {
  return (
    <>
      <Header name="Foods" props={ props } />
      <Recipes />
    </>
  );
}

export default Foods;
