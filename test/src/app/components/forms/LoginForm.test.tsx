import LoginForm from '../../../../../src/app/components/forms/LoginForm';
import { logInWithEmailAndPassword } from '../../../../../src/firebase';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { describe, expect, vi, it, beforeEach, Mock } from 'vitest';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));
vi.mock('../../../../../src/firebase', () => ({
  logInWithEmailAndPassword: vi.fn(),
  auth: {},
}));

vi.mock('../../../../../src/app/hooks/useError', () => ({
  useError: () => ({
    showError: vi.fn(),
    error: null,
    clearErrors: vi.fn(),
  }),
}));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    (useAuthState as Mock).mockReturnValue([null, false]);
  });

  it('renders the login form', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('fields.email.name:')).toBeInTheDocument();
    expect(screen.getByLabelText('fields.password.name:')).toBeInTheDocument();
    expect(screen.getByText('login:')).toBeInTheDocument();
  });

  it('validates the form and shows errors', async () => {
    render(<LoginForm />);

    const submitButton = screen.getByText('login:');
    expect(submitButton).toBeDisabled();

    const emailInput = screen.getByLabelText('fields.email.name:');
    fireEvent.change(emailInput, { target: { value: 'a' } });

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('validation.invalidEmail')).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    const mockLogin = vi.mocked(logInWithEmailAndPassword);
    render(<LoginForm />);

    const submitButton = screen.getByText('login:');
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('fields.email.name:'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText('fields.password.name:'), { target: { value: 'password123' } });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ email: 'test@gmail.com', password: 'password123' });
    });
  });
});
