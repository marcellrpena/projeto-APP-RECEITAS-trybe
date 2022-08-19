import React from 'react';

function Login() {
  /* const handleClick = (e) => {
    e.preventDefault();
    console.log('oi');
  }; */

  return (
    <main>
      <form>
        <input type="email" data-testid="email-input" />
        <input type="password" data-testid="password-input" />
        <button type="submit" data-testid="login-submit-btn">
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;
