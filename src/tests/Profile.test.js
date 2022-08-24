import React from 'react';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da página de Profile', () => {
  it('Testa se ao clicar no icone de Profile é redirecionado para a tela de Profile', () => {
  renderWithRouterAndContext(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);
    const iconProfile = screen.getByTestId("profile-top-btn");
    userEvent.click(iconProfile);
    const userEmail = screen.getByTestId('profile-email')
    expect(userEmail).toHaveTextContent("test@test.com")
  });
  it('Testa se ao clicar no botão Done Recipes ele muda para a página /done-recipes', () => {
    const { history } = renderWithRouterAndContext(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);
    const iconProfile = screen.getByTestId("profile-top-btn");
    userEvent.click(iconProfile);
    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesButton)
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('Testa se ao clicar no botão Favorite Recipes ele muda para a página /favorite-recipes', () => {
    const { history } = renderWithRouterAndContext(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);
    const iconProfile = screen.getByTestId("profile-top-btn");
    userEvent.click(iconProfile);
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteButton)
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('Testa se ao clicar no botão Logout ele muda para a página "/" ', () => {
    const { history } = renderWithRouterAndContext(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);
    const iconProfile = screen.getByTestId("profile-top-btn");
    userEvent.click(iconProfile);
    const logOutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logOutButton)
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(localStorage.getItem('user')).toBe(null);
  });
});
