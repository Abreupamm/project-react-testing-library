import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testando o componente NotFound.js', () => {
  beforeEach(() => {
    render(<NotFound />);
  });
  test('Verifica se a página possui o texto correto', () => {
    const textElement = screen.getByRole(
      'heading', { name: /Page requested not found/i, level: 2 },
    );
    expect(textElement).toBeInTheDocument();
  });
  test('Verifica se a página mostra a imagem correta', () => {
    const imgElemnent = screen.getByRole(
      'img', { name: /Pikachu crying because the page requested was not found/i },
    );
    expect(imgElemnent.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
