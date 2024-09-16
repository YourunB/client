import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LanguageMenu from '../../../../../src/app/components/header/LanguageMenu';

describe('LanguageMenu', () => {
  const handleLanguageChangeMock = vi.fn();

  it('renders all language options', () => {
    render(<LanguageMenu handleLanguageChange={handleLanguageChangeMock} currentLanguage="en" />);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Русский')).toBeInTheDocument();
  });

  it('calls handleLanguageChange when a different language is clicked', () => {
    render(<LanguageMenu handleLanguageChange={handleLanguageChangeMock} currentLanguage="en" />);

    const russianButton = screen.getByText('Русский');
    fireEvent.click(russianButton);

    expect(handleLanguageChangeMock).toHaveBeenCalledWith('ru');
  });

  it('disables the current language option', () => {
    render(<LanguageMenu handleLanguageChange={handleLanguageChangeMock} currentLanguage="ru" />);

    const russianButton = screen.getByText('Русский');
    expect(russianButton).toBeDisabled();

    const englishButton = screen.getByText('English');
    expect(englishButton).not.toBeDisabled();
  });
});
