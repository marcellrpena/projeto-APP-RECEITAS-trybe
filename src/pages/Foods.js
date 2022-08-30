import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import '../styles/Foods.css';

function Foods() {
  return (
    <div className="Foods-Container">
      <Header name="Foods" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;
