import React from 'react';
import { PropTypes } from 'prop-types';

function Login({ history }) {
  /* const handleClick = (e) => {
    e.preventDefault();
    console.log('oi');
  }; */

  return (
    <main>
      <form>
        <input type="email" data-testid="email-input" />
        <input type="password" data-testid="password-input" />
        <button
          type="submit"
          data-testid="login-submit-btn"
          onClick={ () => history.push('/foods') }
        >
          Login
        </button>
      </form>
    </main>
  );
}

Login.PropTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default Login;
