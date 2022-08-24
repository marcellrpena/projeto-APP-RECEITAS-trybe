import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';

describe('Testes do componente de Receitas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => jest.resetAllMocks());

  it('Testa se, após fazer Login, são renderizados "cards" de comidas', async () => {
    expect.assertions(2);
    renderWithRouterAndContext(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const corba = screen.getByRole('heading', { name: /corba/i });
    expect(corba).toBeInTheDocument();
  });

  it('Testa se, são renderizados "cards" de bebidas', async () => {
    expect.assertions(2);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    const { history } = renderWithRouterAndContext(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);
    history.push('/drinks');

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const ggDrink = screen.getByRole('heading', { name: 'GG' });
    expect(ggDrink).toBeInTheDocument();
  });

  it('Testa se os cards não são renderizados caso a requisição falhe', async () => {
    expect.assertions(4);
    jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return Promise.reject([]);
    });

    renderWithRouterAndContext(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const corba = screen.queryByRole('heading', { name: /corba/i });
    expect(corba).not.toBeInTheDocument();

    const openSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(openSearchBtn);

    const searchInput = screen.getByTestId('search-input');
    const radio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'beef');
    userEvent.click(radio);
    userEvent.click(searchBtn);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const beef = screen.queryByRole('heading', {
      name: /Beef and Mustard Pie/i,
    });
    expect(beef).not.toBeInTheDocument();
  });
});
