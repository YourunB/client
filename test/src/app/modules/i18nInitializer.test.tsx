import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import I18nInitializer from '../../../../src/app/modules/i18nInitializer';
import i18n from '../../../../src/i18n';

vi.mock('../../../../src/i18n.ts', () => ({
  default: {
    init: vi.fn(),
  },
}));

describe('I18nInitializer', () => {
  test('should call i18n.init on mount', () => {
    render(<I18nInitializer />);
    expect(i18n.init).toHaveBeenCalled();
  });
});
