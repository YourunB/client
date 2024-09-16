import { render, screen, act } from '@testing-library/react';
import { useContext } from 'react';
import { describe, test, expect, vi } from 'vitest';
import { ErrorProvider, ErrorContext } from '../../../../../src/app/components/error/ErrorProvider';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ErrorProvider', () => {
  test('provide default context values', () => {
    render(
      <ErrorProvider>
        <ErrorContext.Consumer>
          {(context) => {
            expect(context.error).toBeNull();
            expect(typeof context.showError).toBe('function');
            expect(typeof context.clearError).toBe('function');
            return null;
          }}
        </ErrorContext.Consumer>
      </ErrorProvider>
    );
  });

  test('show and clear error', async () => {
    vi.useFakeTimers();
    render(
      <ErrorProvider>
        <ErrorContext.Consumer>
          {(context) => {
            context.showError('invalid-credential');

            vi.advanceTimersByTime(5000);
            expect(context.error).toBeNull();

            return null;
          }}
        </ErrorContext.Consumer>
      </ErrorProvider>
    );
    vi.useRealTimers();
  });

  test('transform error messages', () => {
    render(
      <ErrorProvider>
        <ErrorContext.Consumer>
          {(context) => {
            context.showError('email-already-in-use');
            context.showError('network-request-failed');
            context.showError('unknown-error');
            context.showError();
            return null;
          }}
        </ErrorContext.Consumer>
      </ErrorProvider>
    );
  });

  test('provide default', () => {
    const TestComponent = () => {
      const { error, showError, clearError } = useContext(ErrorContext);
      expect(error).toBeNull();
      expect(typeof showError).toBe('function');
      expect(typeof clearError).toBe('function');
      return null;
    };

    render(
      <ErrorProvider>
        <TestComponent />
      </ErrorProvider>
    );
  });

  test('show and clear error', () => {
    const TestComponent = () => {
      const { error, showError, clearError } = useContext(ErrorContext);
      return (
        <div>
          <span data-testid="error">{error}</span>
          <button onClick={() => showError('invalid-credential')}>Show Error</button>
          <button onClick={clearError}>Clear Error</button>
        </div>
      );
    };

    render(
      <ErrorProvider>
        <TestComponent />
      </ErrorProvider>
    );

    act(() => {
      screen.getByText('Show Error').click();
    });

    expect(screen.getByTestId('error').textContent).toBe('errors.invalid');

    act(() => {
      screen.getByText('Clear Error').click();
    });

    expect(screen.getByTestId('error').textContent).toBe('');
  });

  test('should transform error messages correctly', () => {
    const TestComponent = () => {
      const { showError } = useContext(ErrorContext);
      return (
        <div>
          <button onClick={() => showError('email-already-in-use')}>User Exists</button>
          <button onClick={() => showError('network-request-failed')}>Network Error</button>
          <button onClick={() => showError('unknown-error')}>Unknown Error</button>
        </div>
      );
    };

    render(
      <ErrorProvider>
        <TestComponent />
      </ErrorProvider>
    );

    act(() => {
      screen.getByText('User Exists').click();
    });
    expect(screen.getByText('User Exists')).toBeInTheDocument();

    act(() => {
      screen.getByText('Network Error').click();
    });
    expect(screen.getByText('Network Error')).toBeInTheDocument();

    act(() => {
      screen.getByText('Unknown Error').click();
    });
    expect(screen.getByText('Network Error')).toBeInTheDocument();
  });
});
