import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import DoneRecipes from '../pages/DoneRecipes';
import doneRecipesMock from './helpers/mocks/doneRecipes';

describe('Testa a tela de receitas prontas', () => {
  it('Verifica se os botões de filtro foram renderizados', () => {
    expect.assertions(3);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    renderWithRouterAndContext(<DoneRecipes />);

    const allButton = screen.getByRole('button', { name: /all/i });
    const foodButton = screen.getByRole('button', { name: /food/i });
    const drinkButton = screen.getByRole('button', { name: /drink/i });

    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });

  it('Verifica se, caso o card seja de comida, os detalhes são renderizados corretamente', () => {
    expect.assertions(8);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    renderWithRouterAndContext(<DoneRecipes />);

    const foodImage = screen.getByAltText(/Spicy Arrabiata Penne/i);
    const foodName = screen.getByText(/Spicy Arrabiata Penne/i);
    const foodCategory = screen.getByText(/Vegetarian/i);
    const foodNationality = screen.getByText(/Italian/i);
    const foodDoneDate = screen.getByTestId('0-horizontal-done-date');
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    const foodPastaTag = screen.getByText(/Pasta/i);
    const foodCurryTag = screen.getByText(/Curry/i);

    expect(foodImage).toBeInTheDocument();
    expect(foodCategory).toBeInTheDocument();
    expect(foodNationality).toBeInTheDocument();
    expect(foodName).toBeInTheDocument();
    expect(foodDoneDate).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(foodPastaTag).toBeInTheDocument();
    expect(foodCurryTag).toBeInTheDocument();
  });

  it('Verifica se, caso o card seja de bebida, os detalhes são renderizados corretamente', () => {
    expect.assertions(6);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    renderWithRouterAndContext(<DoneRecipes />);

    const drinkImage = screen.getByAltText(/Aquamarine/i);
    const drinkName = screen.getByText(/Aquamarine/i);
    const drinkCategory = screen.getByText(/Cocktail/i);
    const drinkIsAlcoholic = screen.getByText(/Alcoholic/i);
    const drinkDoneDate = screen.getByTestId('1-horizontal-done-date');
    const shareButton = screen.getByTestId('1-horizontal-share-btn');

    expect(drinkImage).toBeInTheDocument();
    expect(drinkCategory).toBeInTheDocument();
    expect(drinkIsAlcoholic).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
    expect(drinkDoneDate).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
  });

  it('Verifica se, ao clicar em uma imagem da receita de comida, a rota é alterada para a página da receita', () => {
    expect.assertions(1);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    history.push('/done-recipes');

    const toRecipeButton = screen.getByAltText(/Spicy/i).parentElement;

    userEvent.click(toRecipeButton);

    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Verifica se, ao clicar em uma imagem da receita de comida, a rota é alterada para a página da receita', () => {
    expect.assertions(1);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    history.push('/done-recipes');

    const toRecipeButton = screen.getByAltText(/Aquamarine/i).parentElement;

    userEvent.click(toRecipeButton);

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Verifica se, ao clicar no nome da receita, a rota é alterada para a página da receita', () => {
    expect.assertions(1);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    history.push('/done-recipes');

    const toRecipeButton = screen.getByText(/Spicy/i).parentElement;

    userEvent.click(toRecipeButton);

    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Verifica se muda a rota ao clicar no botão de profile', () => {
    expect.assertions(1);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    history.push('/done-recipes');

    const profileButton = screen.getByTestId('profile-top-btn');

    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se, ao clicar no filtro "food", renderiza somente as receitas finalizadas que são comidas', () => {
    expect.assertions(2);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    history.push('/done-recipes');

    const foodName = screen.getByText(/Spicy/i);
    const drinkName = screen.getByText(/Aquamarine/i);
    const foodButton = screen.getByRole('button', { name: /food/i });
    userEvent.click(foodButton);

    expect(foodName).toBeInTheDocument();
    expect(drinkName).not.toBeInTheDocument();
  });

  it('Verifica se, ao clicar no filtro "drink", renderiza somente as receitas finalizadas que são bebidas', () => {
    expect.assertions(2);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    history.push('/done-recipes');

    const foodName = screen.getByText(/Spicy/i);
    const drinkName = screen.getByText(/Aquamarine/i);
    const drinkButton = screen.getByRole('button', { name: /drink/i });
    userEvent.click(drinkButton);

    expect(drinkName).toBeInTheDocument();
    expect(foodName).not.toBeInTheDocument();
  });

  it('Verifica se, ao clicar no filtro "all" estando com outro filtro aplicado, renderiza todas as receitas', () => {
    expect.assertions(2);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    history.push('/done-recipes');

    const foodName = screen.getByText(/Spicy/i);
    const drinkName = screen.getByText(/Aquamarine/i);
    const allButton = screen.getByRole('button', { name: /all/i });

    userEvent.click(allButton);

    expect(drinkName).toBeInTheDocument();
    expect(foodName).toBeInTheDocument();
  });

  it('Verifica se, ao clicar no botão de compartilhar, uma mensagem aparece', () => {
    expect.assertions(1);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    history.push('/done-recipes');

    const shareButton = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(shareButton);

    const linkCopied = screen.getByText(/Link copied!/i);

    expect(linkCopied).toBeInTheDocument();
  });

  it('Verifica se, ao clicar no "X" do "Link Copied", o componente desaparece', () => {
    expect.assertions(1);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    history.push('/done-recipes');

    const shareButton = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(shareButton);

    const linkCopied = screen.getByText(/Link copied!/i);

    const closeBtn = screen.getByRole('button', { name: /x/i });

    userEvent.click(closeBtn);

    expect(linkCopied).not.toBeInTheDocument();
  });

  it('Verifica se, ao clicar no botão de compartilhar, o link da receita é copiado', () => {
    expect.assertions(3);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
    const { history } = renderWithRouterAndContext(<DoneRecipes />);
    history.push('/done-recipes');

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

    const shareButtonDrinks = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(shareButtonDrinks);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    // expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
    //   'http://localhost:3000/drinks/178319'
    // );
  });
});
