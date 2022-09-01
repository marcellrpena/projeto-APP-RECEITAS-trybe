import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div className="Drinks-Container">
      <Header name="Drinks" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
