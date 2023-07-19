
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeContext, ThemeProvider, Theme } from './ThemeContext';

describe('ThemeContext', () => {
  test('provides the default theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <div>{theme}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText(Theme.Light)).toBeInTheDocument();
  });

  test('toggles the theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <div>
              <div>{theme}</div>
              <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');

    fireEvent.click(toggleButton);
    expect(screen.getByText(Theme.Dark)).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText(Theme.Light)).toBeInTheDocument();
  });
});
