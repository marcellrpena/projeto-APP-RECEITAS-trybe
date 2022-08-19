import { func, shape } from 'prop-types';
import React, { useContext } from 'react';
import LoginContext from '../contexts/RecipeContexts';

function Login({ history }) {
  const { email } = useContext(LoginContext);

  const handleClick = (e) => {
    e.preventDefault();
    const TOKEN = 1;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', TOKEN);
    localStorage.setItem('cocktailsToken', TOKEN);
    history.push('/foods');
  };

  return (
    <main>
      <form>
        <label htmlFor="email-input">
          Email
          <input type="email" id="email-input" data-testid="email-input" />
        </label>
        <label htmlFor="password-input">
          Senha
          <input type="password" id="password-input" data-testid="password-input" />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          onClick={ handleClick }
        >
          Login
        </button>
      </form>
    </main>
  );
}

Login.propTypes = {
  history: shape({ push: func }).isRequired,
};

export default Login;
