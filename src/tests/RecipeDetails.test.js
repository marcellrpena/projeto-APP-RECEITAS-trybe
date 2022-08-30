import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import userEvent from '@testing-library/user-event';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import RecipeDetails from '../pages/RecipeDetails';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// https://trybecourse.slack.com/archives/C01T2C18DSM/p1630099534116900?thread_ts=1630092847.100100&cid=C01T2C18DSM
jest.mock('clipboard-copy', () => jest.fn());
const mockClipboard = require('clipboard-copy');

describe('Testes gerais da tela de detalhes de uma receita', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => jest.resetAllMocks());

  describe('Testa a Requisição à API ao abrir a tela de Detalhes da Receita', () => {
    it('Verifica se as requisições à API de comidas foi realizada', async () => {
      expect.assertions(2);

      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/foods/${meals.meals[1].idMeal}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const kumpir = screen.getByText(/kumpir/i);
      expect(kumpir).toBeInTheDocument();
    });

    it('Verifica se as requisições à API de bebidas foi realizada', async () => {
      expect.assertions(2);
      jest.resetAllMocks();
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });

      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/drinks/${drinks.drinks[1].idDrink}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const a1Drink = screen.getByText(/a1/i);
      expect(a1Drink).toBeInTheDocument();
    });
  });

  describe('Testa as funcionalidades da tela de detalhes', () => {
    it('Verifica se ao clicar no botão de compartilhar o link da receita é copiado', async () => {
      expect.assertions(2);

      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/foods/${meals.meals[1].idMeal}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const shareBtn = screen.getByTestId('share-btn');
      mockClipboard.mockImplementation(() => null);
      userEvent.click(shareBtn);
      expect(mockClipboard).toBeCalledTimes(1);
    });

    it('Testa se, ao adicionar aos favoritos, o ícone do coração fica preenchido', async () => {
      localStorage.clear();
      expect.assertions(3);

      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/foods/${meals.meals[1].idMeal}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const favBtn = screen.getByTestId('favorite-btn');
      expect(favBtn).toHaveAttribute('src', whiteHeartIcon);
      userEvent.click(favBtn);
      expect(favBtn).toHaveAttribute('src', blackHeartIcon);
    });

    it('Testa se a receita continua favoritada após "recarregar" a página', async () => {
      expect.assertions(4);
      localStorage.clear();
      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/foods/${meals.meals[1].idMeal}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const favBtn = screen.getByTestId('favorite-btn');
      userEvent.click(favBtn);
      expect(favBtn).toHaveAttribute('src', blackHeartIcon);
      window.location.reload;
      expect(favBtn).toHaveAttribute('src', blackHeartIcon);
      expect(favBtn).not.toHaveAttribute('src', whiteHeartIcon);
    });

    it('Testa se, ao remover dos favoritos, o ícone do coração fica "vazio"', async () => {
      localStorage.clear();
      jest.resetAllMocks();
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });
      expect.assertions(4);

      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/drinks/${drinks.drinks[1].idDrink}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const favBtn = screen.getByTestId('favorite-btn');
      expect(favBtn).toHaveAttribute('src', whiteHeartIcon);
      userEvent.click(favBtn);
      expect(favBtn).toHaveAttribute('src', blackHeartIcon);
      userEvent.click(favBtn);
      expect(favBtn).toHaveAttribute('src', whiteHeartIcon);
    });

    it('Testa se ao clicar em "Start Recipe" é redirecionado para página de progresso da comida', async () => {
      localStorage.clear();
      expect.assertions(2);

      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/foods/${meals.meals[1].idMeal}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const startBtn = screen.getByTestId('start-recipe-btn');
      userEvent.click(startBtn);
      const { pathname } = history.location;
      expect(pathname).toBe(`/foods/${meals.meals[1].idMeal}/in-progress`);
    });

    it('Testa se ao clicar em "Start Recipe" é redirecionado para página de progresso da bebida', async () => {
      expect.assertions(2);

      localStorage.clear();
      jest.resetAllMocks();
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks),
      });

      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/drinks/${drinks.drinks[1].idDrink}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const startBtn = screen.getByTestId('start-recipe-btn');
      userEvent.click(startBtn);
      const { pathname } = history.location;
      expect(pathname).toBe(`/drinks/${drinks.drinks[1].idDrink}/in-progress`);
    });

    it('Testa se aparece o botao "Continue Recipe" caso a receita já tenha sido iniciada', async () => {
      const { history } = renderWithRouterAndContext(<RecipeDetails />);
      history.push(`/foods/${meals.meals[1].idMeal}`);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const startBtn = screen.getByTestId('start-recipe-btn');
      expect(startBtn).toHaveTextContent('Continue Recipe');
    });
  });
});
