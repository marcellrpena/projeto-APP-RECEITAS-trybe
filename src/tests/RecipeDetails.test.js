import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';
import RecipeDetails from '../pages/RecipeDetails';

describe('Testa a Requisição à API ao abrir a tela de Detalhes da Receita', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(meals),
        });
    });
    
    afterEach(() => jest.resetAllMocks());
    
    it('Verifica se as requisições à API de comidas foi realizada', async () => {
        expect.assertions(2);
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(meals),
        });
        const { history } = renderWithRouterAndContext(<App />);
        history.push(`/foods/${meals.meals[1].idMeal}`);        
        await waitFor(() => expect(fetch).toHaveBeenCalled());
    });

    it('Verifica se as requisições à API de bebidas foi realizada', async () => {
        expect.assertions(2);
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(drinks),
        });
        const { history } = renderWithRouterAndContext(<App />);
        history.push(`/foods/${drinks.drinks[1].idDrink}`);        
        await waitFor(() => expect(fetch).toHaveBeenCalled());
    });
});