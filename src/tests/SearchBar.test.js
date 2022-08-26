import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import meals from '../../cypress/mocks/meals';
import milkDrinks from '../../cypress/mocks/milkDrinks';
import beefMeals from '../../cypress/mocks/beefMeals';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import Header from '../components/Header';
import App from '../App';

describe('Testes da barra de pesquisa', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => jest.restoreAllMocks());

  it('Testa se o botão "Search" está desativado quando os inputs estão vazios', () => {
    expect.assertions(1);

    renderWithRouterAndContext(<Header />);

    const showSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(showSearchBtn);

    const searchBtn = screen.getByTestId('exec-search-btn');
    expect(searchBtn).toBeDisabled();
  });

  it('Deve aparecer um alerta quando colocar mais de uma letra no input e selecionar "First-Letter"', () => {
    expect.assertions(2);
    global.alert = jest.fn();

    renderWithRouterAndContext(<Header />);

    const showSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(showSearchBtn);

    const searchInput = screen.getByTestId('search-input');
    const fistLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(fistLetterRadio);
    userEvent.type(searchInput, 'co');

    expect(global.alert).toHaveBeenCalled();
    expect(searchInput).toHaveValue('c');
  });

  it('Deve aparecer um alerta quando colocar nao encontrar uma comida filtrada', async () => {
    expect.assertions(2);
    jest.resetAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(null),
    });
    global.alert = jest.fn();

    renderWithRouterAndContext(<Header />);

    const showSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(showSearchBtn);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'AMONGUS');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(global.alert).toHaveBeenCalled();
  });

  describe('Testes de Filtro', () => {
    it('Testa se é chamado a API de comidas quando está na rota "/foods" e faz uma pesquisa', () => {
      expect.assertions(1);
      const { history } = renderWithRouterAndContext(<Header />);
      history.push('/foods');

      const showSearchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(showSearchBtn);

      const searchInput = screen.getByTestId('search-input');
      const radio = screen.getByTestId('ingredient-search-radio');
      const searchBtn = screen.getByTestId('exec-search-btn');
      userEvent.type(searchInput, 'beef');
      userEvent.click(radio);

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
      renderWithRouterAndContext(<Header />);

      const showSearchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(showSearchBtn);

      const searchInput = screen.getByTestId('search-input');
      const nameRadio = screen.getByTestId('name-search-radio');
      const searchBtn = screen.getByTestId('exec-search-btn');
      userEvent.type(searchInput, 'milk');
      userEvent.click(nameRadio);

      jest.resetAllMocks();
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(milkDrinks),
      });

      userEvent.click(searchBtn);

      const URL =
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=milk';
      expect(fetch).toHaveBeenCalledWith(URL);
    });

    it('Testa se traz comidas pelo filtro "First-Letter"', () => {
      expect.assertions(1);
      renderWithRouterAndContext(<App />);

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
        json: jest.fn().mockResolvedValue(oneMeal),
      });

      userEvent.click(searchBtn);

      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';
      expect(fetch).toHaveBeenCalledWith(URL);
    });

    it('Testa se redireciona para pagina da comida caso encontre apenas uma', async () => {
      expect.assertions(2);
      const { history } = renderWithRouterAndContext(<Header />);
      history.push('/foods');

      const showSearchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(showSearchBtn);

      const searchInput = screen.getByTestId('search-input');
      const nameRadio = screen.getByTestId('name-search-radio');
      const searchBtn = screen.getByTestId('exec-search-btn');
      userEvent.type(searchInput, 'Spicy Arrabiata Penne');
      userEvent.click(nameRadio);
      
      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });

      userEvent.click(searchBtn);

      await waitFor(() => expect(fetch).toHaveBeenCalled());
      expect(history.location.pathname).toBe('/foods/52771');
    });

    it('Testa se redireciona para pagina da bebida caso encontre apenas uma', async () => {
      expect.assertions(2);
      const { history } = renderWithRouterAndContext(<Header />);
      history.push('/drinks');

      const showSearchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(showSearchBtn);

      const searchInput = screen.getByTestId('search-input');
      const nameRadio = screen.getByTestId('name-search-radio');
      const searchBtn = screen.getByTestId('exec-search-btn');
      userEvent.type(searchInput, 'Aquamarine');
      userEvent.click(nameRadio);
      
      jest.restoreAllMocks();
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneDrink),
      });

      userEvent.click(searchBtn);

      await waitFor(() => expect(fetch).toHaveBeenCalled());
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
});
