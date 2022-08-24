import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import Foods from '../pages/Foods';

describe('Testes do Footer', () => {
  it('Testa se o footer é renderizado', () => {
    renderWithRouterAndContext(<Foods />);

    const foods = screen.getByRole('heading', { name: /foods/i, level: 1 });

    expect(foods).toBeInTheDocument();
  });

  it('Testa se o footer renderiza os botões de Drinks e Meals', () => {
    renderWithRouterAndContext(<Foods />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('food-bottom-btn');

    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });

  it('Testa se, ao clicar no botão de Drinks renderiza a página de Drinks', () => {
    const { history } = renderWithRouterAndContext(<Foods />);

    const drinksButton = screen.getByTestId('drinks-footer-btn');

    userEvent.click(drinksButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Testa se, ao clicar no botão de Foods renderiza a página de Foods', () => {
    const { history } = renderWithRouterAndContext(<Foods />);

    const mealsButton = screen.getByTestId('meals-footer-btn');

    userEvent.click(mealsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
