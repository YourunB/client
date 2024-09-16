import { render, screen } from '@testing-library/react';
import GraphAnimation from '../../../../src/app/components/GraphAnimation';
import { describe, test, expect } from 'vitest';

describe('GraphAnimation', () => {
  test('render graph image', () => {
    render(<GraphAnimation />);

    const graphImage = screen.getByAltText('GraphQL');
    expect(graphImage).toBeInTheDocument();
    expect(graphImage).toHaveAttribute('src', expect.stringContaining('graph.png'));
    expect(graphImage).toHaveAttribute('width', '250');
    expect(graphImage).toHaveAttribute('height', '250');
  });
});
