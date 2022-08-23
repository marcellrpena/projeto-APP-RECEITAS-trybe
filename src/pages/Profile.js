import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile(props) {
  return (
    <Header name="Profile" props={ props } />
    <Footer />
  );
}

export default Profile;
