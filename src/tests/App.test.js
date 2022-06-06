import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testando o componente App.js', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });
  test(
    'Verifica se existe um link com o texto "Home" "About" e "Favorite Pokémons"', () => {
      const homeElement = screen.getByRole('link', { name: 'Home' });
      const aboutElement = screen.getByRole('link', { name: 'About' });
      const favoriteElement = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(homeElement).toBeInTheDocument();
      expect(aboutElement).toBeInTheDocument();
      expect(favoriteElement).toBeInTheDocument();
    },
  );
  test('Verifica se a aplicação é redirecionada para a página Home', () => {
    const hometElement = screen.getByRole('link', { name: 'Home' });
    userEvent.click(hometElement);
    const homeTitleElement = screen.getByRole(
      'heading', { name: /Encountered pokémons/i, level: 2 },
    );
    expect(homeTitleElement).toBeInTheDocument();
  });
  test('Verifica se a aplicação é redirecionada para a página About', () => {
    const aboutElement = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutElement);
    const aboutTitleElement = screen.getByRole(
      'heading', { name: /About Pokédex/i, level: 2 },
    );
    expect(aboutTitleElement).toBeInTheDocument();
  });
  test('Verifica se a aplicação é redirecionada para a página Favorites', () => {
    const favoriteElement = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteElement);
    const favTitleElement = screen.getByRole(
      'heading', { name: /Favorite pokémons/i, level: 2 },
    );
    expect(favTitleElement).toBeInTheDocument();
  });
  test('Verifica se a aplicação é redirecionada para a Not Found', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/lalaland');
    const notFoundElement = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2,
    });
    expect(notFoundElement).toBeInTheDocument();
  });
});
