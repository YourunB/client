import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Error from '../../../../../src/app/components/error/Error';
import { useError } from '../../../../../src/app/hooks/useError';

vi.mock('../../../../../src/app/hooks/useError');

describe('Error component', () => {
  it('render nothing', () => {
    useError.mockReturnValue({ error: null, clearError: vi.fn() });

    const { container } = render(<Error />);
    expect(container).toBeEmptyDOMElement();
  });

  it('render error', () => {
    const mockClearError = vi.fn();
    useError.mockReturnValue({ error: 'Test error', clearError: mockClearError });

    render(<Error />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls clearError', () => {
    const mockClearError = vi.fn();
    useError.mockReturnValue({ error: 'Test error', clearError: mockClearError });

    render(<Error />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockClearError).toHaveBeenCalled();
  });
});
