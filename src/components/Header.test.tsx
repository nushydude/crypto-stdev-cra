import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  const matchMediaMock = jest.fn();

  window.matchMedia = window.matchMedia || matchMediaMock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders the header container', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    });

    render(<Header />, { wrapper: MemoryRouter });
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  // test('renders the desktop links', () => {
  //   matchMediaMock.mockReturnValue({
  //     matches: false,
  //     addListener: function () {},
  //     removeListener: function () {},
  //   });

  //   render(<Header />, { wrapper: MemoryRouter });
  //   const desktopLinks = screen.getByRole('navigation');
  //   expect(desktopLinks).toBeInTheDocument();
  //   const singleTokenLink = screen.getByRole('link', { name: /Single Token/ });
  //   expect(singleTokenLink).toBeInTheDocument();
  //   const bestDCALink = screen.getByRole('link', { name: /Best DCA/ });
  //   expect(bestDCALink).toBeInTheDocument();
  //   const bestBuyLink = screen.getByRole('link', { name: /Best Buy/ });
  //   expect(bestBuyLink).toBeInTheDocument();
  //   const settingsLink = screen.getByRole('link', { name: /Settings/ });
  //   expect(settingsLink).toBeInTheDocument();
  // });

  //   test('renders the hamburger menu and page title in mobile view', () => {
  //     matchMediaMock.mockReturnValue({
  //       matches: true,
  //       addListener: function () {},
  //       removeListener: function () {},
  //     });

  //     render(<Header />, { wrapper: MemoryRouter });
  //     const mobileContainer = screen.getByTestId('mobile-container');
  //     expect(mobileContainer).toBeInTheDocument();
  //     const hamburgerMenu = screen.getByRole('button', { name: 'Menu' });
  //     expect(hamburgerMenu).toBeInTheDocument();
  //     const pageTitle = screen.getByText(/dca strategy/i);
  //     expect(pageTitle).toBeInTheDocument();
  //     expect(screen.queryByRole('nav')).toBeNull();
  //   });

  //   test('renders the version number', () => {
  //     render(<Header />, { wrapper: MemoryRouter });
  //     const version = screen.getByText(/v\d+\.\d+\.\d+/i);
  //     expect(version).toBeInTheDocument();
  //   });
});
