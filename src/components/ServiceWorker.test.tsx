import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { ServiceWorker } from './ServiceWorker';
import { toast } from 'react-toastify';

// Mock the toast function
vi.mock('react-toastify', () => ({
  toast: vi.fn(),
}));

// Mock the service worker
const mockServiceWorker = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};

// Mock the navigator
const mockNavigator = {
  serviceWorker: mockServiceWorker,
};

describe('ServiceWorker', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Mock the navigator
    Object.defineProperty(window, 'navigator', {
      value: mockNavigator,
      writable: true,
    });
  });

  afterEach(() => {
    // Clean up after each test
    vi.clearAllMocks();
  });

  it('should not set up event listeners if serviceWorker is not available', () => {
    // Mock navigator without serviceWorker
    Object.defineProperty(window, 'navigator', {
      value: {},
      writable: true,
    });

    render(<ServiceWorker />);

    expect(mockServiceWorker.addEventListener).not.toHaveBeenCalled();
  });

  it('should set up event listeners when serviceWorker is available', () => {
    render(<ServiceWorker />);

    expect(mockServiceWorker.addEventListener).toHaveBeenCalledTimes(2);
    expect(mockServiceWorker.addEventListener).toHaveBeenCalledWith(
      'controllerchange',
      expect.any(Function)
    );
    expect(mockServiceWorker.addEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function)
    );
  });

  it('should show toast when controllerchange event is triggered', async () => {
    render(<ServiceWorker />);

    // Get the controllerchange handler
    const controllerChangeHandler = mockServiceWorker.addEventListener.mock.calls.find(
      call => call[0] === 'controllerchange'
    )[1];

    // Trigger the handler and wait for state updates
    await act(async () => {
      controllerChangeHandler();
    });

    // Check if toast was called with correct arguments
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      {
        position: 'bottom-right',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  });

  it('should show toast when UPDATE_AVAILABLE message is received', async () => {
    render(<ServiceWorker />);

    // Get the message handler
    const messageHandler = mockServiceWorker.addEventListener.mock.calls.find(
      call => call[0] === 'message'
    )[1];

    // Trigger the handler with UPDATE_AVAILABLE message and wait for state updates
    await act(async () => {
      messageHandler({ data: { type: 'UPDATE_AVAILABLE' } });
    });

    // Check if toast was called with correct arguments
    expect(toast).toHaveBeenCalledWith(
      expect.any(Function),
      {
        position: 'bottom-right',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  });

  it('should not show toast for non-UPDATE_AVAILABLE messages', async () => {
    render(<ServiceWorker />);

    // Get the message handler
    const messageHandler = mockServiceWorker.addEventListener.mock.calls.find(
      call => call[0] === 'message'
    )[1];

    // Trigger the handler with a different message type and wait for state updates
    await act(async () => {
      messageHandler({ data: { type: 'SOME_OTHER_TYPE' } });
    });

    // Check that toast was not called
    expect(toast).not.toHaveBeenCalled();
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = render(<ServiceWorker />);

    // Unmount the component
    unmount();

    // Check that removeEventListener was called for both events
    expect(mockServiceWorker.removeEventListener).toHaveBeenCalledTimes(2);
    expect(mockServiceWorker.removeEventListener).toHaveBeenCalledWith(
      'controllerchange',
      expect.any(Function)
    );
    expect(mockServiceWorker.removeEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function)
    );
  });
}); 