import { vi, describe, afterEach, beforeEach, test, Mock } from 'vitest';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import useCheckAuth from '../../../../src/app/utils/useCheckAuth';
import { renderHook, act } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

describe('checkAuth', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.mock('../../../../src/firebase.ts', () => ({
      auth: {
        signInWithEmailAndPassword: vi.fn(),
        createUserWithEmailAndPassword: vi.fn(),
        signOut: vi.fn(),
      },
      firestore: {
        collection: vi.fn().mockReturnThis(),
        doc: vi.fn().mockReturnThis(),
        set: vi.fn(),
        get: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    }));

    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should redirect to "/" if user is not authenticated', async () => {
    (useAuthState as Mock).mockReturnValue([null, false]);

    await act(async () => {
      renderHook(() => useCheckAuth());
    });

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('should not redirect if user is authenticated', async () => {
    (useAuthState as Mock).mockReturnValue([{ uid: '123' }, false]);

    await act(async () => {
      renderHook(() => useCheckAuth());
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('should not redirect if loading', async () => {
    (useAuthState as Mock).mockReturnValue([null, true]);

    await act(async () => {
      renderHook(() => useCheckAuth());
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
