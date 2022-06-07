import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testando o componete Pokemon.js', () => {
  const pokeTest = pokemons[0];
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });
  test('Verifica se é renderizado um card com as informações corretas', () => {
    const nameElement = screen.getByTestId('pokemon-name');
    const typeElement = screen.getByTestId('pokemon-type');
    const weightElement = screen.getByTestId('pokemon-weight');
    const imageElement = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(nameElement.innerHTML).toBe(pokeTest.name);
    expect(typeElement.innerHTML).toBe(pokeTest.type);
    expect(weightElement.innerHTML).toBe('Average weight: 6.0 kg');
    expect(imageElement.src).toBe(pokeTest.image);
  });
  test('Verifica se existe um link para exibir detalhes', () => {
    const linkElement = screen.getByRole('link', { name: 'More details' });
    expect(linkElement.href).toBe(`http://localhost/pokemons/${pokeTest.id}`);
    userEvent.click(linkElement);
    const textDetail = screen.getByText(`${pokeTest.name} Details`);
    expect(textDetail).toBeInTheDocument();
    const inputFavoriteEl = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(inputFavoriteEl);
    const iconeElement = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(iconeElement.src).toBe('http://localhost/star-icon.svg');
    // expect(linkElement).toBeInTheDocument();
  });
});
