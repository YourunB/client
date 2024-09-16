import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import ClientPage from '../../../../../src/app/[locale]/[...slug]/page';

vi.mock('../../../../../src/app/components/Client.tsx', () => ({
  __esModule: true,
  default: () => <div>Mocked Client</div>,
}));

describe('ClientPage', () => {
  test('renders correctly', () => {
    const { getByText } = render(<ClientPage />);
    expect(getByText('Mocked Client')).toBeInTheDocument();
  });
});
