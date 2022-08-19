import React from 'react';

function Login() {
  const handleChange = ({ target }, func = '') => {
    func(target.value);
  };

  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        onChange={ (e) => handleChange(e) }
      />

      <input
        type="password"
        data-testid="password-input"
      />

      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
