'use client';
import { useState, createContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

enum ErrorType {
  INVALID_CREDENTIALS = 'invalid-credential',
  USER_EXISTS = 'email-already-in-use',
  NETWORK_ERROR = 'network-request-failed',
  UNKNOWN_ERROR = 'unknown-error',
}

interface ErrorContextType {
  error: string | null;
  showError: (message?: string) => void;
  clearError: () => void;
}

const defaultContext: ErrorContextType = {
  error: null,
  showError: () => {},
  clearError: () => {},
};

export const ErrorContext = createContext(defaultContext);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const { t } = useTranslation();

  const [error, setError] = useState<string | null>(null);

  const transformError = (message?: string): string => {
    if (!message) return t('errors.unknown');
    const errorMessage = message.toLowerCase();

    switch (true) {
      case errorMessage.includes(ErrorType.INVALID_CREDENTIALS):
        return t('errors.invalid');
      case errorMessage.includes(ErrorType.USER_EXISTS):
        return t('errors.userExist');
      case errorMessage.includes(ErrorType.NETWORK_ERROR):
        return t('errors.network');
      default:
        return t('errors.unknown');
    }
  };

  const showError = (message?: string) => {
    setError(transformError(message));
    setTimeout(() => setError(null), 5000);
  };

  const clearError = () => {
    setError(null);
  };

  return <ErrorContext.Provider value={{ error, showError, clearError }}>{children}</ErrorContext.Provider>;
};
