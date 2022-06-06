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
    const imgElemnent = screen.getByRole('img', { name: 'Pokédex' });
    expect(aboutTitleElement).toBeInTheDocument();
    expect(info1).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
    expect(imgElemnent.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
