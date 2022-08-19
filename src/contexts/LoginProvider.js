import { node } from 'prop-types';
import React, { useState } from 'react';
import LoginContext from './RecipeContexts';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');

  const context = {
    email,
    setEmail,
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
