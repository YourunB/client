import { describe, expect, it, vi, beforeEach } from 'vitest';
import { i18nRouter } from 'next-i18n-router';
import { NextRequest } from 'next/server';
import { middleware } from '../../src/middleware';

vi.mock('next-i18n-router', () => ({
  i18nRouter: vi.fn(),
}));

const mockRequest = {} as NextRequest;

describe('middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call i18nRouter with the correct arguments', () => {
    const mockI18nRouter = i18nRouter as vi.Mock;

    middleware(mockRequest);

    expect(mockI18nRouter).toHaveBeenCalledWith(mockRequest, expect.any(Object));
  });
});
