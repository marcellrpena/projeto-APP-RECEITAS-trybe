import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';

describe('Testes da pagina de receitas em progresso', () => {
 /*  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
  });

  afterEach(() => jest.resetAllMocks()); */

  it('Testa se, após navegar para receitas em progresso com um id de receita a página é renderizada para aquela receita', async () => {
    //expect.assertions(2);
    const { history } = renderWithRouterAndContext(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);
    history.push('/foods/52771/in-progress');
    const foodImg = screen.getByTestId("recipe-photo");
    expect(foodImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    history.push('/foods/178319/in-progress');
    const drinkImg = screen.getByTestId("recipe-photo");
    expect(drinkImg).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
  });
});
