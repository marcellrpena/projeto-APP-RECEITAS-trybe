import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../contexts/Contexts';
import logo from '../images/logo.png';
import logoAlt from '../images/logo-alt.png';
import '../styles/Login.css';

function Login() {
  const history = useHistory();
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
    <main className="Login-Container">
      <div className="Logo-Container">
        <img
          className="Logo"
          src={ logo }
          alt="Um coração com chapéu de chef, colher e garfo"
        />
        <img
          className="Logo-Alt"
          src={ logoAlt }
          alt={ `Um coração com chapéu de chef,
          colher e garfo com legenda a legenda "Big Chefe, o seu App de Receitas"` }
        />
      </div>
      <div className="Form-Container">
        <h3>Sign in</h3>
        <Form onSubmit={ handleSubmit }>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-left">Enter your email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ex.: foods@email.com"
              data-testid="email-input"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              data-testid="password-input"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </Form.Group>
          <Button
            type="submit"
            disabled={ disableBtn }
            data-testid="login-submit-btn"
            className={ `${disableBtn ? 'btn-secondary' : 'btn-login'}` }
          >
            Login
          </Button>
        </Form>
      </div>
    </main>
  );
}

export default Login;
