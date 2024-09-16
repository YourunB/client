import { render, screen } from '@testing-library/react';
import Footer from '../../../../src/app/components/Footer';
import { vi, describe, test, expect } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Footer', () => {
  test('render authors', () => {
    render(<Footer />);

    const authors = ['authors.liza.name', 'authors.yury.name', 'authors.valery.name'];

    authors.forEach((author) => {
      expect(screen.getByText(author)).toBeInTheDocument();
    });
  });

  test('renders copyright section correctly', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
  });

  test('render logo with link', () => {
    render(<Footer />);
    const rsLogoLink = screen.getByRole('link', { name: /RS Logo/i });
    expect(rsLogoLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
