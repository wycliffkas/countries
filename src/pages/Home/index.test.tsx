import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './index';

describe('Home component', () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          name: {
            official: 'The Republic of Uganda',
            common: 'Uganda',
          },
          population: 1000000,
          region: 'Africa',
          capital: ['Kampala'],
          flags: {
            svg: 'flag.svg',
          },
        },
        {
          name: {
            official: 'The Republic of Kenya',
            common: 'Kenya',
          },
          population: 2000000,
          region: 'Africa',
          capital: ['Nairobi'],
          flags: {
            svg: 'flag.svg',
          },
        },
      ]),
    } as unknown as Response);
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders the component and displays countries', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('The Republic of Uganda')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('The Republic of Kenya')).toBeInTheDocument();
    });
  });

  it('filters countries based on search and region', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );;

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search for a country...');
      const regionSelect = screen.getByText('Filter by Region');

      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(searchInput, { target: { value: 'R' } });

      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(regionSelect, { target: { value: 'Africa' } });

      expect(screen.getByText('The Republic of Uganda')).toBeInTheDocument();
    });
  });
});
