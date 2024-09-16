import { describe, test, expect, vi } from 'vitest';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { logInWithEmailAndPassword, registerWithEmailAndPassword, logout } from '../../src/firebase';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

describe('firebase', () => {
  const mockAuth = getAuth();

  test('log in', async () => {
    const loginData = { email: 'test@example.com', password: 'password123' };
    await logInWithEmailAndPassword(loginData);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, loginData.email, loginData.password);
  });

  test('register', async () => {
    const registerData = { email: 'test@example.com', password: 'password123' };
    await registerWithEmailAndPassword(registerData);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, registerData.email, registerData.password);
  });

  test('log out', () => {
    logout();
    expect(signOut).toHaveBeenCalledWith(mockAuth);
  });
});
