import { describe, test, expect } from 'vitest';
import { decodeBase64, encodeBase64 } from '../../../../src/app/modules/encodeBase64';

describe('encodeBase64', () => {
  test('should encode a string to Base64', () => {
    const input = 'Hello, World!';
    const expectedOutput = 'SGVsbG8sIFdvcmxkIQ==';
    expect(encodeBase64(input)).toBe(expectedOutput);
  });

  test('handle empty string', () => {
    const input = '';
    const expectedOutput = '';
    expect(encodeBase64(input)).toBe(expectedOutput);
  });

  test('handle special characters', () => {
    const input = 'Привет, мир!';
    const expectedOutput = '0J/RgNC40LLQtdGCLCDQvNC40YAh';
    expect(encodeBase64(input)).toBe(expectedOutput);
  });
});

describe('decodeBase64', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should decode a valid base64 string', () => {
    const encoded = btoa(unescape(encodeURIComponent('Hello, World!')));
    const decoded = decodeBase64(encoded);

    expect(decoded).toBe('Hello, World!');
  });

  it('should return null and log an error for an invalid base64 string', () => {
    const invalidBase64 = 'InvalidString@@';
    const decoded = decodeBase64(invalidBase64);

    expect(decoded).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Failed to decode base64 string');
  });

  it('should handle empty string input', () => {
    const decoded = decodeBase64('');

    expect(decoded).toBe('');
    expect(console.error).not.toHaveBeenCalled();
  });
});
