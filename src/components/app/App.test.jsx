import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Color Selection History', () => {
  it('renders a working color input selector', () => {
    render(<App />);

    const colorInput = screen.getByLabelText('color-input');
    const display = screen.getByLabelText('display');

    fireEvent.change(colorInput, { target: { value: '#0000ff' } });
    fireEvent.change(colorInput, { target: { value: '#00ff00' } });
    fireEvent.change(colorInput, { target: { value: '#ffff00' } });

    return waitFor(() => {
      expect(display).toHaveStyle({ 'background-color': '#ffff00' });
    });
  });
});
