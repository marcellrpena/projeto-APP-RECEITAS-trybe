import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import doneRecipesMock from './helpers/mocks/doneRecipes';

describe('Teste da tela de receitas favoritas', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipesMock));

  it('Verifica se, ao clicar no botão de compartilhar, o link da receita é copiado', () => {
    expect.assertions(2);

    const { history } = renderWithRouterAndContext(<FavoriteRecipes />);
    history.push('/favorite-recipes');

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    const shareButtonFoods = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButtonFoods);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      'http://localhost/foods/52771'
    );
  });

  it('Testa se a receita é removida dos favoritos', () => {
    const { history } = renderWithRouterAndContext(<FavoriteRecipes />);
    history.push('/favorite-recipes');
    const arrabiata = screen.getByText(/arrabiata/i);
    expect(arrabiata).toBeInTheDocument();
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn);
    expect(arrabiata).not.toBeInTheDocument();
  });
});
