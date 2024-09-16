import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../../../src/app/components/Header';
import { expect, describe, test, vi, beforeEach, Mock } from 'vitest';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

describe('Header component', () => {
  beforeEach(() => {
    vi.mock('../../../../src/firebase.ts', () => ({
      auth: {
        onAuthStateChanged: vi.fn(),
        signInWithEmailAndPassword: vi.fn(),
        signOut: vi.fn(),
      },
      firestore: {
        collection: vi.fn().mockReturnThis(),
        doc: vi.fn().mockReturnThis(),
        set: vi.fn(),
        get: vi.fn(),
      },
    }));
  });

  vi.mock('../../../../src/i18n.ts', () => ({
    default: {
      init: vi.fn(),
    },
  }));

  vi.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  }));

  vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
  }));

  vi.mock('react-firebase-hooks/auth', () => ({
    useAuthState: vi.fn(),
  }));

  const mockRouter = {
    push: vi.fn(),
  };

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
    (useAuthState as Mock).mockReturnValue([null]);
  });

  test('renders home link', () => {
    render(<Header />);
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  test('renders user links when user is logged in', () => {
    (useAuthState as Mock).mockReturnValue([
      {
        email: 'test@example.com',
        getIdTokenResult: vi.fn().mockResolvedValue({ token: 'fake-token' }),
      },
    ]);
    render(<Header />);
    expect(screen.getByText('Graph')).toBeInTheDocument();
    expect(screen.getByText('Rest')).toBeInTheDocument();
  });

  test('renders user email when user is logged in', () => {
    (useAuthState as Mock).mockReturnValue([
      {
        email: 'test@example.com',
        getIdTokenResult: vi.fn().mockResolvedValue({ token: 'fake-token' }),
      },
    ]);
    render(<Header />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('calls onLogout when logout button is clicked', () => {
    (useAuthState as Mock).mockReturnValue([
      {
        email: 'test@example.com',
        getIdTokenResult: vi.fn().mockResolvedValue({ token: 'fake-token' }),
      },
    ]);
    render(<Header />);
    fireEvent.click(screen.getByText('logout'));
  });

  test('changes background color on scroll', () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(screen.getByTestId('header').style.background).toBe('rgb(235, 208, 246)');
  });

  test('restores background color when scrolled to top', () => {
    render(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(screen.getByTestId('header').style.background).toBe('transparent');
  });

  test('render logo', () => {
    render(<Header />);
    expect(screen.getByAltText('GraphQL logo')).toBeInTheDocument();
  });

  test('opens and closes mobile menu', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });

    (useAuthState as Mock).mockReturnValue([null]);
    render(<Header />);

    const menuButton = screen.getByText('☰');
    fireEvent.click(menuButton);

    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.queryByText('login')).not.toBeInTheDocument();
    expect(screen.queryByText('register')).not.toBeInTheDocument();
  });
});
