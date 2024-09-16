import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MethodSelector } from '../../../../src/app/components/MethodSelector';

describe('MethodSelector', () => {
  it('should call setMethod with "GET" when GET radio button is clicked', () => {
    const setMethodMock = vi.fn();
    render(<MethodSelector method="POST" setMethod={setMethodMock} />);

    fireEvent.click(screen.getByLabelText('GET'));
    expect(setMethodMock).toHaveBeenCalledWith('GET');
  });

  it('should call setMethod with "POST" when POST radio button is clicked', () => {
    const setMethodMock = vi.fn();
    render(<MethodSelector method="GET" setMethod={setMethodMock} />);

    fireEvent.click(screen.getByLabelText('POST'));
    expect(setMethodMock).toHaveBeenCalledWith('POST');
  });
});
