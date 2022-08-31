import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user')) || '';
  const logoutApp = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="Profile-Container">
      <Header name="Profile" />
      <main className="Profile-Informations">
        <h5
          data-testid="profile-email"
        >
          {email.email}
        </h5>
        <section className="all-btn-profile">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
            className="btn-login"
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
            className="btn-login"
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logoutApp }
            className="btn-login"
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
