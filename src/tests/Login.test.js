import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testes da página de Login', () => {
  it('Testa se é redirecionado para a rota "/foods" depois de fazer login', () => {
    const { history } = renderWithRouterAndContext(<App />)

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });

  describe('Testa a validação do botão de login', () => {
    it('Testa se o botão fica desativado ao abrir a página de login', () => {
      renderWithRouterAndContext(<App />)

      const loginButton = screen.getByRole('button', { name: /login/i });

      expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o "email" não tem um numero mínimo de caracteres', () => {
      renderWithRouterAndContext(<App />)

      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

      userEvent.type(emailInput, 'test');
      userEvent.type(passwordInput, '1234567');

      expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui "@"', () => {
      renderWithRouterAndContext(<App />)

      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

      userEvent.type(emailInput, 'test-test.com');
      userEvent.type(passwordInput, '1234567');

      expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui nada antes do "@"', () => {
      renderWithRouterAndContext(<App />)

      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

      userEvent.type(emailInput, '@test.com');
      userEvent.type(passwordInput, '1234567');

      expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui nada depois do "@"', () => {
      renderWithRouterAndContext(<App />)

      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

      userEvent.type(emailInput, 'test@.com');
      userEvent.type(passwordInput, '1234567');

      expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui ".com"', () => {
      renderWithRouterAndContext(<App />)

      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

      userEvent.type(emailInput, 'test@test');
      userEvent.type(passwordInput, '1234567');

      expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui nada antes do ".com"', () => {
      renderWithRouterAndContext(<App />)

      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

      userEvent.type(emailInput, 'test@.com');
      userEvent.type(passwordInput, '1234567');

      expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se a senha não tem um numero mínimo de caracteres', () => {
      renderWithRouterAndContext(<App />)

      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, '123456');

      expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão é ativado se o email e a senha seguem o formato padrão', () => {
      renderWithRouterAndContext(<App />)

      const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);

      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, '1234567');

      expect(loginButton).not.toHaveAttribute('disabled');
    });
  });
});
