import { render, screen } from '@testing-library/react';
import HistoryPage from '../../../../../src/app/[locale]/history/page';
import { describe, it, expect } from 'vitest';

vi.mock('../../../../../src/app/components/history/History', () => ({
  default: () => <div data-testid="mock-history">Mocked History Component</div>,
}));

describe('HistoryPage', () => {
  it('renders the History component', () => {
    render(<HistoryPage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
