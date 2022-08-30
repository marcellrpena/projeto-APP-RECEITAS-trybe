import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../contexts/Contexts';

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
    <main>
      <Form onSubmit={ handleSubmit }>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-left">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </Form.Group>
        <Button
          variant={ disableBtn ? 'secondary' : 'warning' }
          type="submit"
          disabled={ disableBtn }
          data-testid="login-submit-btn"
          style={ { width: '100%' } }
        >
          Login
        </Button>
      </Form>
    </main>
  );
}

export default Login;
