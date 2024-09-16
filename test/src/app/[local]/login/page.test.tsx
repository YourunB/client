import { render, screen } from '@testing-library/react';
import LoginPage from '../../../../../src/app/[locale]/login/page';
import { describe, test, expect, vi } from 'vitest';

vi.mock('../../../../../src/app/components/forms/LoginForm.tsx', () => ({
  __esModule: true,
  default: () => <div>Mocked LoginForm</div>,
}));

describe('LoginPage', () => {
  test('renders the LoginPage component', () => {
    render(<LoginPage />);
    const mainElement = screen.getByTestId('child');
    expect(mainElement).toBeInTheDocument();
  });
});
