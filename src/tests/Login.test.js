import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import LoginProvider from '../contexts/LoginProvider';
import App from '../App';

describe('Testa a validação do botão de login', () => {
    it('Testa se o botão fica desativado ao abrir a página de login', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>) ;

        const loginButton = screen.getByRole('button', { name: /login/i });
    
        expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o "email" não tem um numero mínimo de caracteres', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>);

        const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    
        userEvent.type(emailInput, 'test');
        userEvent.type(passwordInput, '1234567');        
            
        expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui "@"', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>);

        const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    
        userEvent.type(emailInput, 'test-test.com');
        userEvent.type(passwordInput, '1234567');        
          
        expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui nada antes do "@"', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>);

        const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    
        userEvent.type(emailInput, '@test.com');
        userEvent.type(passwordInput, '1234567');        
            
        expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui nada depois do "@"', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>);

        const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    
        userEvent.type(emailInput, 'test@.com');
        userEvent.type(passwordInput, '1234567');        
            
        expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui ".com"', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>);

        const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    
        userEvent.type(emailInput, 'test@test');
        userEvent.type(passwordInput, '1234567');        
            
        expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se o email não possui nada antes do ".com"', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>);

        const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    
        userEvent.type(emailInput, 'test@.com');
        userEvent.type(passwordInput, '1234567');        
            
        expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão fica desativado se a senha não tem um numero mínimo de caracteres', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>);

        const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    
        userEvent.type(emailInput, 'test@test.com');
        userEvent.type(passwordInput, '123456');        
            
        expect(loginButton).toHaveAttribute('disabled');
    });

    it('Testa se o botão é ativado se o email e a senha seguem o formato padrão', () => {
        render(<BrowserRouter><LoginProvider><App /></LoginProvider></BrowserRouter>);

        const emailInput = screen.getByPlaceholderText(/digite seu e-mail/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    
        userEvent.type(emailInput, 'test@test.com');
        userEvent.type(passwordInput, '1234567');        
           
        expect(loginButton).not.toHaveAttribute('disabled');
      });
})