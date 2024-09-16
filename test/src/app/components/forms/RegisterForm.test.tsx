import RegisterForm from '../../../../../src/app/components/forms/RegisterForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { describe, expect, vi, it, beforeEach, Mock } from 'vitest';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('../../../../../src/firebase', () => ({
  registerWithEmailAndPassword: vi.fn(),
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

describe('RegisterForm', () => {
  beforeEach(() => {
    (useAuthState as Mock).mockReturnValue([null, false]);
  });

  it('renders the registration form', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText('fields.name.name:')).toBeInTheDocument();
    expect(screen.getByLabelText('fields.email.name:')).toBeInTheDocument();
    expect(screen.getByLabelText('fields.password.name:')).toBeInTheDocument();
    expect(screen.getByLabelText('fields.confirmPassword.name:')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });

  it('validates the form and shows errors', async () => {
    render(<RegisterForm />);

    const submitButton = screen.getByText('register');
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('fields.email.name:'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('fields.password.name:'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('fields.confirmPassword.name:'), { target: { value: 'mismatch' } });

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('validation.invalidEmail')).toBeInTheDocument();
      expect(screen.getByText('validation.passwordComplexity')).toBeInTheDocument();
      expect(screen.getByText('validation.passwordsMustMatch')).toBeInTheDocument();
    });
  });

  it('does not render the form if user is logged in', () => {
    (useAuthState as Mock).mockReturnValue([{}, false]);

    render(<RegisterForm />);

    expect(screen.queryByLabelText('fields.name.name:')).not.toBeInTheDocument();
    expect(screen.queryByText('register')).not.toBeInTheDocument();
  });

  it('does not render the form while loading', () => {
    (useAuthState as Mock).mockReturnValue([null, true]);

    render(<RegisterForm />);

    expect(screen.queryByLabelText('fields.name.name:')).not.toBeInTheDocument();
    expect(screen.queryByText('register')).not.toBeInTheDocument();
  });

  it('clears errors when input values are corrected', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('fields.email.name:'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('fields.password.name:'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('fields.confirmPassword.name:'), { target: { value: 'mismatch' } });

    await waitFor(() => {
      expect(screen.getByText('validation.invalidEmail')).toBeInTheDocument();
      expect(screen.getByText('validation.passwordComplexity')).toBeInTheDocument();
      expect(screen.getByText('validation.passwordsMustMatch')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('fields.email.name:'), { target: { value: 'valid.email@example.com' } });
    fireEvent.change(screen.getByLabelText('fields.password.name:'), { target: { value: 'ValidPass123!' } });
    fireEvent.change(screen.getByLabelText('fields.confirmPassword.name:'), { target: { value: 'ValidPass123!' } });

    await waitFor(() => {
      expect(screen.queryByText('validation.invalidEmail')).not.toBeInTheDocument();
      expect(screen.queryByText('validation.passwordComplexity')).not.toBeInTheDocument();
      expect(screen.queryByText('validation.passwordsMustMatch')).not.toBeInTheDocument();
    });
  });
});
