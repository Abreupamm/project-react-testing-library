import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componete PokemonDetails.js', () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });
  test('Verifica se as informção estão corretas', () => {
    const linkElement = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkElement);
    const textDetail = screen.getByText(/Pikachu Details/i);
    const textSummaryEl = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const describeElement = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make/i,
    );
    expect(textDetail).toBeInTheDocument();
    expect(linkElement).not.toBeInTheDocument();
    expect(textSummaryEl).toBeInTheDocument();
    expect(describeElement).toBeInTheDocument();
  });
  test('Verifica se existe uma seção com os mapas', () => {
    const titleElement = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    const locationElement = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(locationElement[0].src).toBe('https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(locationElement[1].src).toBe('https://pwo-wiki.info/images/5/5b/Pp.gif');
    expect(titleElement).toBeInTheDocument();
    locationElement.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    const textElement1 = screen.getByText(/Kanto Viridian Forest/i);
    const textElement2 = screen.getByText(/Kanto Power Plant/i);
    expect(textElement1 && textElement2).toBeInTheDocument();
  });
});
