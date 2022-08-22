import { func, shape } from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import LoginContext from '../contexts/RecipeContexts';

function Login({ history }) {
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const { email, setEmail } = useContext(LoginContext);

  const validateEmail = (userEmail, minCharacters) => {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return userEmail.match(mailFormat) && email.length >= minCharacters;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const TOKEN = 1;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', TOKEN);
    localStorage.setItem('cocktailsToken', TOKEN);
    history.push('/foods');
  };

  const enableLoginBtn = () => {
    const minCharacters = 6;
    const validation = password.length > minCharacters
      && validateEmail(email, minCharacters);
    setDisableBtn(!validation);
  };

  useEffect(() => {
    enableLoginBtn();
  }, [email, password, disableBtn]);

  return (
    <main>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            id="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="password"
            name="password"
            id="password-input"
            data-testid="password-input"
            placeholder="Digite sua senha"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disableBtn }
          onClick={ () => history.push('/foods') }
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
