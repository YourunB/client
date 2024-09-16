import { describe, test, vi, expect, Mock } from 'vitest';
import { useContext } from 'react';
import { useError } from '../../../../src/app/hooks/useError';

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useContext: vi.fn(),
    createContext: actual.createContext,
  };
});

describe('useError', () => {
  test('return context', () => {
    const mockContext = { error: 'Test error' };
    (useContext as Mock).mockReturnValue(mockContext);

    const result = useError();
    expect(result).toBe(mockContext);
  });

  test('return undefined', () => {
    (useContext as Mock).mockReturnValue(undefined);

    const result = useError();
    expect(result).toBeUndefined();
  });
});
