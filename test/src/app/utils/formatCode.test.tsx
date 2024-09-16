import { describe, test, vi, expect, Mock } from 'vitest';
import { formatCode } from '../../../../src/app/utils/formatCode';
import * as prettier from 'prettier/standalone';

vi.mock('prettier/standalone', () => ({
  format: vi.fn((code) => `formatted: ${code}`),
}));

describe('formatCode', () => {
  test('should format GraphQL code', async () => {
    const input = 'query { test }';
    const expectedOutput = 'formatted: query { test }';
    const result = await formatCode(input, 'graphql');
    expect(result).toBe(expectedOutput);
  });

  test('should format REST (JavaScript) code', async () => {
    const input = 'const a = 1;';
    const expectedOutput = 'formatted: const a = 1;';
    const result = await formatCode(input, 'rest');
    expect(result).toBe(expectedOutput);
  });

  test('should format JSON code', async () => {
    const input = '{"key": "value"}';
    const expectedOutput = 'formatted: {"key": "value"}';
    const result = await formatCode(input, 'json');
    expect(result).toBe(expectedOutput);
  });

  test('should handle formatting errors gracefully', async () => {
    (prettier.format as Mock).mockImplementationOnce(() => {
      throw new Error('Formatting error');
    });
    const input = 'const a = 1;';
    const result = await formatCode(input, 'rest');
    expect(result).toBeUndefined();
  });
});
