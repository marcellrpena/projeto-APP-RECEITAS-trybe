import React from 'react';

function Login() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('oi');
  };

  return (
    <main>
      <form>
        <button
          data-testid="login-submit-btn"
          type="submit"
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </main>
  );
}

export default Login;
