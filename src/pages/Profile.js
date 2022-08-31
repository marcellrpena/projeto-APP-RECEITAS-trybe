import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../images/default-user.svg';
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
        <div className="User-Informations">
          <img src={ profileIcon } alt="Profile" />
          <h5
            data-testid="profile-email"
          >
            {email.email}
          </h5>
        </div>
        <section className="all-btn-profile">
          <Button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
            className="btn-login"
            variant="info"
          >
            Done Recipes
          </Button>
          <Button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
            className="btn-login"
            variant="info"
          >
            Favorite Recipes
          </Button>
          <Button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logoutApp }
            className="btn-login"
            variant="info"
          >
            Logout
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
