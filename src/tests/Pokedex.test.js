import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokedex.js', () => {
  const name = 'pokemon-name';
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
        const cardElement = screen.getByTestId(name);
        let i = 0;
        if (index !== pokemons.length - 1) {
          i = index + 1;
        }
        userEvent.click(buttonElement);
        const pokemon = pokemons[i];
        expect(cardElement.innerHTML).toBe(pokemon.name);
      });
    },
  );
  test('Verifica se é monstardo um pokemon por vez', () => {
    const pokemonElement = screen.getAllByTestId(name);
    expect(pokemonElement.length).toBe(1);
  });
  test('Verifica se existem todos os botões de filtro', () => {
    const buttonsElements = screen.getAllByTestId('pokemon-type-button');
    buttonsElements.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    pokemons.forEach((pokemon) => {
      const elementFilter = buttonsElements.filter((el) => el.innerHTML === pokemon.type);
      expect(elementFilter.length).toBe(1);
    });
    const buttonAllElement = screen.getByRole(
      'button', { name: 'All', hidden: true },
    );
    expect(buttonAllElement).toBeInTheDocument();
  });
  test('Verifica se existe um botão para resetar o filtro', () => {
    const buttonAllElement = screen.getByRole(
      'button', { name: 'All', hidden: true },
    );
    expect(buttonAllElement).toBeInTheDocument();
    userEvent.click(buttonAllElement);
    const pokemonElement = screen.getByTestId(name);
    pokemons.forEach((pokemon) => {
      expect(pokemon.name).toBe(pokemonElement.innerHTML);
      const buttonElement = screen.getByRole(
        'button', { name: 'Próximo pokémon', hidden: true },
      );
      userEvent.click(buttonElement);
    });
  });
});
