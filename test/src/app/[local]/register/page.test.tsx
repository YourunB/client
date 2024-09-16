import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import RegisterPage from '../../../../../src/app/[locale]/register/page';

vi.mock('../../../../../src/app/components/forms/RegisterForm.tsx', () => ({
  __esModule: true,
  default: () => <div>Mocked RegisterForm</div>,
}));

describe('RestPage', () => {
  test('render', () => {
    const { getByText } = render(<RegisterPage />);
    expect(getByText('Mocked RegisterForm')).toBeInTheDocument();
  });
});
