import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header name="Foods" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
