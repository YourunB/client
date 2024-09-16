import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LinksForUser from '../../../../../src/app/components/header/LinksForUser';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        Graph: 'Graph',
        Rest: 'Rest',
        'history.rout': 'History',
      };
      return translations[key] || key;
    },
  }),
}));

describe('LinksForUser', () => {
  it('renders the links with correct text and href attributes', () => {
    render(<LinksForUser />);

    expect(screen.getByText('Graph')).toBeInTheDocument();
    expect(screen.getByText('Rest')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();

    expect(screen.getByText('Graph').closest('a')).toHaveAttribute('href', '/graph');
    expect(screen.getByText('Rest').closest('a')).toHaveAttribute('href', '/rest');
    expect(screen.getByText('History').closest('a')).toHaveAttribute('href', '/history');
  });
});
