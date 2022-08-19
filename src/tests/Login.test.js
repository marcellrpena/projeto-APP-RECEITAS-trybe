import React from 'react';
import renderWithRouter from './helpers/renderWith';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../contexts/LoginProvider';
import App from '../App';

describe('Testes da página de Login', () => {
  it('Testa se é redirecionado para a rota "/foods" depois de fazer login', () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <App />
      </LoginProvider>
    );
    
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '123456');
    userEvent.click(loginBtn);
    
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
