import React from 'react';
import { screen } from '@testing-library/react';
import { meals } from '../../cypress/mocks/meals';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testes do componente Header', () => {
  describe('Testa o clique no icone Profile do header', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals),
      });
    });

    it('Testa se ao clicar no icone de profile é redirecionado para página de profile', () => {
      const { history } = renderWithRouterAndContext(<App />);
      const emailInput = screen.getByTestId('email-input');
      const passInput = screen.getByTestId('password-input');
      const loginBtn = screen.getByTestId('login-submit-btn');

      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passInput, '1234567');
      userEvent.click(loginBtn);
      const iconProfile = screen.getByTestId('profile-top-btn');
      userEvent.click(iconProfile);
      const { pathname } = history.location;
      expect(pathname).toBe('/profile');
    });

    it('Testa se ao clicar no icone de Seach uma barra de busca aparece', () => {
      renderWithRouterAndContext(<App />);
      renderWithRouter(
        <LoginProvider>
          <App />
        </LoginProvider>
      );
      const emailInput = screen.getByTestId('email-input');
      const passInput = screen.getByTestId('password-input');
      const loginBtn = screen.getByTestId('login-submit-btn');
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passInput, '1234567');
      userEvent.click(loginBtn);
      const searchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(searchBtn);
      const searchBar = screen.getByTestId('search-input');
      expect(searchBar).toBeInTheDocument();
    });
  });
});
