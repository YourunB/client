import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { useRouter, usePathname } from 'next/navigation';
import Client from '../../../../src/app/components/Client';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock('../../../../src/app/utils/useCheckAuth.ts');

vi.mock('../../../../src/app/components/RestForm.tsx', () => ({
  __esModule: true,
  default: () => <div>RestForm</div>,
}));

vi.mock('../../../../src/app/components/GraphForm', () => ({
  __esModule: true,
  default: () => <div>GraphForm</div>,
}));

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

describe('Client component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('should render REST form when pathname includes "rest"', () => {
    useRouter.mockImplementation(() => ({
      push: vi.fn(),
      pathname: '/en/rest',
    }));
    usePathname.mockImplementation(() => '/en/rest');

    render(<Client />);
    expect(screen.getByText('RestForm')).toBeInTheDocument();
  });

  test('should render GraphQL form when pathname includes "graph"', () => {
    useRouter.mockImplementation(() => ({
      push: vi.fn(),
      pathname: '/en/graph',
    }));
    usePathname.mockImplementation(() => '/en/graph');

    render(<Client />);
    expect(screen.getByText('GraphForm')).toBeInTheDocument();
  });

  test('should redirect to 404 when pathname is invalid', () => {
    const pushMock = vi.fn();
    useRouter.mockImplementation(() => ({
      push: pushMock,
      pathname: '/en/invalid',
    }));
    usePathname.mockImplementation(() => '/en/invalid');

    render(<Client />);

    expect(pushMock).toHaveBeenCalledWith('/404');
  });
});
