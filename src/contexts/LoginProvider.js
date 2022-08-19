import { node } from 'prop-types';
import React, { useState } from 'react';
import LoginContext from './RecipeContexts';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);

  const context = {
    email,
    setEmail,
    password,
    setPassword,
    disableBtn,
    setDisableBtn,
  };

  return (
    <LoginContext.Provider value={ context }>
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: node.isRequired,
};

export default LoginProvider;
