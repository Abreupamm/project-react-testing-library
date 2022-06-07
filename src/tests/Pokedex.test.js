import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { element } from 'prop-types';
import App from '../App';
// import Pokedex from '../pages';
import pokemons from '../data';

describe('Testando o componente Pokedex.js', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });
  test('Verifica se existe o texto "Encountered pokémons"', () => {
    const titleElement = screen.getByRole(
      'heading', { name: 'Encountered pokémons', level: 2 },
    );
    expect(titleElement).toBeInTheDocument();
  });
  test(
    'Verifica  se é exibido o próximo pokémon da lista quando o botão clicado',
    () => {
      const buttonElement = screen.getByRole(
        'button', { name: 'Próximo pokémon', hidden: true },
      );
      pokemons.forEach((el, index) => {
        if (index === pokemons.length - 1) {
          userEvent.click(buttonElement);
          const cardElement1 = screen.getByTestId('pokemon-name');
          const pokemon = pokemons[0];
          expect(cardElement1.innerHTML).toBe(pokemon.name);
        } else {
          const i = index + 1;
          userEvent.click(buttonElement);
          const cardElement2 = screen.getByTestId('pokemon-name');
          const pokemon = pokemons[i];
          expect(cardElement2.innerHTML).toBe(pokemon.name);
        }
      });
    },
  );
  test('Verifica se é monstardo um pokemon por vez', () => {
    const pokemonElement = screen.getAllByTestId('pokemon-name');
    expect(pokemonElement.length).toBe(1);
  });
});
