import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UpdateAvailableAlert } from './UpdateAvailableAlert';

describe('UpdateAvailableAlert', () => {
  it('renders the update alert message', () => {
    render(<UpdateAvailableAlert closeToast={jest.fn()} />);
    expect(
      screen.getByText('An update to the app is available'),
    ).toBeInTheDocument();
  });

  it('has an "Update now" button that reloads the window', () => {
    render(<UpdateAvailableAlert closeToast={jest.fn()} />);
    const updateNowButton = screen.getByText('Update now');
    expect(updateNowButton).toBeInTheDocument();

    // Mock window.location.reload
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    fireEvent.click(updateNowButton);
    expect(reloadMock).toHaveBeenCalled();
  });

  it('has an "Update later" button that calls closeToast', () => {
    const closeToastMock = jest.fn();
    render(<UpdateAvailableAlert closeToast={closeToastMock} />);
    const updateLaterButton = screen.getByText('Update later');
    expect(updateLaterButton).toBeInTheDocument();

    fireEvent.click(updateLaterButton);
    expect(closeToastMock).toHaveBeenCalled();
  });
});
