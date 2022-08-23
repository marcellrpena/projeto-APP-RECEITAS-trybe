import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import renderWithRouterAndContext from './helpers/renderWithRouter';
import beefMeals from '../../cypress/mocks/beefMeals';

describe('Testes da barra de pesquisa', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  })

  afterEach(() => jest.resetAllMocks());

  it('Testa se o botão "Search" está desativado quando os inputs estão vazios', () => {
    expect.assertions(1);

    renderWithRouterAndContext(<App />)

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
    renderWithRouterAndContext(<App />)

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
    userEvent.type(searchInput, 'beef');
    userEvent.click(igredientRadio);

    expect(searchInput).toHaveValue('beef');
    expect(igredientRadio).toBeChecked();
    expect(searchBtn).toBeEnabled();

    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    userEvent.click(searchBtn);

    const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=beef';
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('Testa se é chamado a API de bebidas quando está na rota "/drinks" e faz uma pesquisa', () => {
    expect.assertions(1);
    const { history } = renderWithRouterAndContext(<App />)

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
    userEvent.type(searchInput, 'beef');
    userEvent.click(nameRadio);

    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    userEvent.click(searchBtn);

    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=beef';
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('Testa se traz comidas pelo filtro "First-Letter"', () => {
    expect.assertions(1);
    renderWithRouterAndContext(<App />)

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
    
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    userEvent.click(searchBtn);

    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('Deve aparecer um alerta quando colocar mais de uma letra no input e selecionar "First-Letter"', () => {
    expect.assertions(2);
    global.alert = jest.fn();

    renderWithRouterAndContext(<App />)

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
