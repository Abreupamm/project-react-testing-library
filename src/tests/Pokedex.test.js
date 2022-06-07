import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  test('Verifica se existe o texto "Encountered pokémons"', () => {
    const titleElement = screen.getByRole(
      'heading', { name: 'Encountered pokémons', level: 2 },
    );
    expect(titleElement).toBeInTheDocument();
  });
  test(
    'Verifica  se é exibido o próximo pokémon da lista quando o botão clicado',
    () => {
      const listCards = [
        'Pikachu',
        'Charmander',
        'Caterpie',
        'Ekans',
        'Ekans',
        'Mew',
        'Rapidash',
        'Snorlax',
        'Dragonair',
      ];
      const buttonElement = screen.getAllByRole('button', { name: /próximo pokémon/i });
      listCards.forEach((el, index) => {
        if (index === listCards.length - 1) {
          userEvent.click(buttonElement);
          const cardElement1 = screen.getByTestId('pokemon-name');
          expect(cardElement1).toBe(listCards[0]);
        } else {
          const i = index + 1;
          userEvent.click(buttonElement);
          const cardElement1 = screen.getByTestId('pokemon-name');
          expect(cardElement1).toBe(listCards[i]);
        }
      });
    },
  );
});
