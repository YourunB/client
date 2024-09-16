import { render, screen } from '@testing-library/react';
import PageHome from '../../../../src/app/[locale]/page';
import { describe, test, expect } from 'vitest';

describe('PageHome', () => {
  test('render', () => {
    render(<PageHome />);
    const mainElement = screen.getByTestId('home');
    expect(mainElement).toBeInTheDocument();
  });
});
