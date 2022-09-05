import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import Header from '../components/Header';

describe('Testes do componente Header', () => {
  it('Testa se ao clicar no icone de profile é redirecionado para página de profile', () => {
    const { history } = renderWithRouterAndContext(<Header />);
    const iconProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(iconProfile);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa se ao clicar no icone de Search uma barra de busca aparece', () => {
    renderWithRouterAndContext(<Header />);
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
  });

  it('Testa se ao clicar no icone de Home redireciona para a rota "/foods"', () => {
    const { history } = renderWithRouterAndContext(<Header showHomeBtn />);
    const homeBtn = screen.getByTestId('go-home-btn');
    userEvent.click(homeBtn);
    expect(history.location.pathname).toBe('/foods');
  })
});
