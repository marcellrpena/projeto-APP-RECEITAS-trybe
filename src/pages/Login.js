import React, { useContext, useEffect } from 'react';

import RecipeContexts from '../contexts/RecipeContexts';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    disableBtn,
    setDisableBtn,
  } = useContext(RecipeContexts);

  const validateEmail = (string) => {
    const emailString = [...string];
    const arroba = emailString.includes('@');
    const arrobaPosition = emailString.findIndex((letter) => letter === '@');
    const pontoPosition = emailString.findIndex((letter) => letter === '.');
    const pontoCom = string.includes('.com');
    const minimalEmail = 7;
    const notSpaces = !emailString.includes(' ');

    return (emailString.length >= minimalEmail)
      && (arroba)
      && (arrobaPosition > 0 && arrobaPosition < pontoPosition)
      && (pontoCom)
      && (emailString[arrobaPosition + 1] !== '.')
      && (notSpaces);
  };

  const handleChange = ({ target }, func) => {
    func(target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log('oi');
  };

  useEffect(() => {
    const minCharacters = 6;
    if (email.length >= minCharacters
        && password.length > minCharacters && validateEmail(email)) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [email, password, setDisableBtn]);

  return (
    <form onSubmit={ handleClick }>
      <input
        type="email"
        data-testid="email-input"
        placeholder="Digite seu e-mail"
        value={ email }
        onChange={ (e) => handleChange(e, setEmail) }
      />

      <input
        type="password"
        data-testid="password-input"
        placeholder="Digite sua senha"
        value={ password }
        onChange={ (e) => handleChange(e, setPassword) }
      />

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disableBtn }
      >
        Login
      </button>
    </form>
  );
}

export default Login;
