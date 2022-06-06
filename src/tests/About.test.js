import { screen, render } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';

describe('Testando o componente About.js', () => {
  beforeEach(() => {
    render(<About />);
  });
  test('Verifica se a plicação possui informações sobre a Pokédex', () => {
    const aboutTitleElement = screen.getByRole(
      'heading', { name: /About Pokédex/i, level: 2 },
    );
    const info1 = screen.getByText(/This application simulates a Pokédex/i);
    const info2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(aboutTitleElement).toBeInTheDocument();
    expect(info1).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
  });
});
