import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders the login form', () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByTestId('form-login')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('displays error messages for empty fields on submit', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByTestId('submit-button'));

    // Since validation might be asynchronous, we wait for potential state changes.
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    // onSubmit should not be called since the form is not valid.
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with email and password when form is submitted correctly', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId('input-email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByTestId('input-password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password',
      });
    });
  });

  it('does not call onSubmit when email is missing', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId('input-password'), {
      target: { value: 'password' },
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('does not call onSubmit when password is missing', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId('input-email'), {
      target: { value: 'user@example.com' },
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
