import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods(props) {
  return (
    <div>
      <Header name="Foods" props={ props } />
      <Footer />
    </div>
  );
}

export default Foods;
