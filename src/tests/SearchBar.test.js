import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../contexts/LoginProvider';
import RecipesProvider from '../contexts/RecipesProvider';
import App from '../App';
import { meals } from '../../cypress/mocks/meals';

describe('Testes da barra de pesquisa', () => {
  afterEach(() => jest.resetAllMocks());

  it('Testa se o botão "Search" está desativado quando os inputs estão vazios', async () => {
    expect.assertions(1);

    renderWithRouter(
      <LoginProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </LoginProvider>
    );

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const showSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(showSearchBtn);

    const searchBtn = screen.getByTestId('exec-search-btn');
    expect(searchBtn).toBeDisabled();
  });

  it('Testa se é chamado a API de comidas quando está na rota "/foods"', async () => {
    expect.assertions(4);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    renderWithRouter(
      <LoginProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </LoginProvider>
    );

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const showSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(showSearchBtn);

    const searchInput = screen.getByTestId('search-input');
    const igredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'banana');
    userEvent.click(igredientRadio);

    expect(searchInput).toHaveValue('banana');
    expect(igredientRadio).toBeChecked();
    expect(searchBtn).toBeEnabled();

    userEvent.click(searchBtn);

    const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=banana';
    expect(fetch).toHaveBeenCalledWith(URL);
  });
});
