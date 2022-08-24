import React from 'react';
import { shape, func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));
  const logoutApp = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header name="Profile" />
      <main>
        <h5
          data-testid="profile-email"
        >
          {email.email}
        </h5>
        <section>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logoutApp }
          >
            Logout
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
