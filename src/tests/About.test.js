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
    expect(aboutTitleElement).toBeInTheDocument();
  });
});
