import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks(props) {
  return (
    <>
      <Header name="Drinks" props={ props } />
      <Recipes />
    </>
  );
}

export default Drinks;
