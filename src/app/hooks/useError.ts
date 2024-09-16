'use client';

import { useContext } from 'react';
import { ErrorContext } from '../components/error/ErrorProvider';

export const useError = () => {
  const context = useContext(ErrorContext);

  return context;
};
