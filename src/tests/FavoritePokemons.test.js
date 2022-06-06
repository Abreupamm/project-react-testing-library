import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Testando o componente FavoritePokemons.js', () => {
  test('Verifica se a mensagem "No favorite pokemon found" apaece', () => {
    render(<FavoritePokemons />);
    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  test('Verifica se são exibidos todos os cards de pokémons favoritados', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const idList = ['25', '4', '10', '23'];
    idList.forEach((element) => {
      history.push(`/pokemons/${element}`);
      const inputElement = screen.getByLabelText('Pokémon favoritado?');
      userEvent.click(inputElement);
    });
    const favoriteElement = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteElement);
    const detailsPokemons = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans'];
    detailsPokemons.forEach((element) => {
      const el = screen.getByText(element);
      expect(el).toBeInTheDocument();
    });
  });
});
