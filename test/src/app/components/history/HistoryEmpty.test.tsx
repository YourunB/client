import HistoryEmpty from '../../../../../src/app/components/history/HistoryEmpty';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('HistoryEmpty', () => {
  it('renders correctly', () => {
    render(<HistoryEmpty />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('history.empty')).toBeInTheDocument();
    expect(screen.getByText('Graph')).toBeInTheDocument();
    expect(screen.getByText('Rest')).toBeInTheDocument();

    expect(screen.getByText('Graph').closest('a')).toHaveAttribute('href', '/graph');
    expect(screen.getByText('Rest').closest('a')).toHaveAttribute('href', '/rest');
  });
});
