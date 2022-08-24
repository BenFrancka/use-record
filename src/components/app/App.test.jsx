/* eslint-disable max-len */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Color Selection History', () => {
  it('should render all elements on screen', () => {
    //to test a component in react testing library, we need to actually render the component like you would in the application.
    render(<App />);

    //here is where we are querying to find both the color input element and the color display div on the page. By nature of "getBy" query, if the element is not present or can't be found with the query provided, the test will fail at this point.
    const colorInput = screen.getByLabelText('color-input');
    const display = screen.getByLabelText('display');
    //getAllBy returns an array, and can be used to query when there are multiple types of the same element on the page.
    const buttons = screen.getAllByRole('button');

    //expect statements are where we validate what we are testing
    expect(colorInput).toBeInTheDocument();
    expect(display).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });

  it('should render a working color input selector', () => {
    render(<App />);

    const colorInput = screen.getByLabelText('color-input');
    const display = screen.getByLabelText('display');

    //fireEvent can be used to similuate user interactions with elements on the page. In this case we are changing the value of the color input.
    fireEvent.change(colorInput, { target: { value: '#0000ff' } });
    fireEvent.change(colorInput, { target: { value: '#00ff00' } });
    fireEvent.change(colorInput, { target: { value: '#ffff00' } });

    //sometimes in React Testing Library, your test can run faster that it takes for state to change and re-render your screen. This is called a race condition, and a waitFor block is a way of letting your app catch up to your test.
    return waitFor(() => {
      expect(display).toHaveStyle({ 'background-color': '#ffff00' });
    });
  });

  it('should return to previous selection when user clicks undo', () => {
    render(<App />);

    //because we added an aria-label to our buttons, we can more easily target the individually. If we were to simply getByRole, the test would throw an error because there is more than one element with the role "button".
    const undoButton = screen.getByLabelText('undo-button');
    const colorInput = screen.getByLabelText('color-input');
    const display = screen.getByLabelText('display');

    fireEvent.change(colorInput, { target: { value: '#0000ff' } });
    fireEvent.change(colorInput, { target: { value: '#00ff00' } });
    fireEvent.change(colorInput, { target: { value: '#ffff00' } });
    fireEvent.click(undoButton);

    return waitFor(() => {
      expect(display).toHaveStyle({ 'background-color': '#00ff00' });
    });
  });

  it('should move forward to previous selection when user clicks redo', () => {
    render(<App />);

    const undoButton = screen.getByLabelText('undo-button');
    const redoButton = screen.getByLabelText('redo-button');
    const colorInput = screen.getByLabelText('color-input');
    const display = screen.getByLabelText('display');

    fireEvent.change(colorInput, { target: { value: '#0000ff' } });
    fireEvent.change(colorInput, { target: { value: '#00ff00' } });
    fireEvent.change(colorInput, { target: { value: '#ffff00' } });
    fireEvent.click(undoButton);
    fireEvent.click(redoButton);

    return waitFor(() => {
      expect(display).toHaveStyle({ 'background-color': '#ffff00' });
    });
  });

  it('should display correct color value after multiple selections, undos, and redos', () => {
    render(<App />);

    const undoButton = screen.getByLabelText('undo-button');
    const redoButton = screen.getByLabelText('redo-button');
    const colorInput = screen.getByLabelText('color-input');
    const display = screen.getByLabelText('display');

    fireEvent.change(colorInput, { target: { value: '#0000ff' } });
    fireEvent.change(colorInput, { target: { value: '#00ff00' } });
    fireEvent.change(colorInput, { target: { value: '#ffff00' } });
    fireEvent.click(undoButton);
    fireEvent.click(undoButton);
    fireEvent.change(colorInput, { target: { value: 'ffc0cb' } });
    fireEvent.click(undoButton);
    fireEvent.click(redoButton);
    fireEvent.click(redoButton);

    return waitFor(() => {
      expect(display).toHaveStyle({ 'background-color': '#00ff00' });
    });
  });
});
