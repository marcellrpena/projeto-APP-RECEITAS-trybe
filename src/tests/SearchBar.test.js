import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../contexts/LoginProvider';
import RecipesProvider from '../contexts/RecipesProvider';
import App from '../App';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';

describe('Testes da barra de pesquisa', () => {
  afterEach(() => jest.resetAllMocks());

  it('Testa se o botão "Search" está desativado quando os inputs estão vazios', () => {
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

  it('Testa se é chamado a API de comidas quando está na rota "/foods" e faz uma pesquisa', () => {
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

  it('Testa se é chamado a API de bebidas quando está na rota "/drinks" e faz uma pesquisa', () => {
    expect.assertions(1);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    const { history } = renderWithRouter(
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
    history.push('/drinks');

    const showSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(showSearchBtn);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'banana');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=banana';
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('Testa se traz comidas pelo filtro "First-Letter"', () => {
    expect.assertions(1);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
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
    const fistLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(fistLetterRadio);
    userEvent.type(searchInput, 'b');
    userEvent.click(searchBtn);

    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('Deve aparecer um alerta quando colocar mais de uma letra no input e selecionar "First-Letter"', () => {
    expect.assertions(2);
    global.alert = jest.fn();

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
    const fistLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(fistLetterRadio);
    userEvent.type(searchInput, 'co');

    expect(global.alert).toHaveBeenCalled();
    expect(searchInput).toHaveValue('c');
  });
});
