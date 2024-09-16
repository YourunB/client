import { describe, test, expect } from 'vitest';
import { TFunction } from 'i18next';
import { createLoginSchema, createRegisterSchema } from '../../../../src/app/utils/validation';

const t: TFunction = (key: string) => key;

describe('Validation Schemas', () => {
  describe('createLoginSchema', () => {
    const schema = createLoginSchema(t);

    test('validate valid email and password', async () => {
      const validData = { email: 'test@example.com', password: 'password123' };
      await expect(schema.validate(validData)).resolves.toBe(validData);
    });

    test('invalidate invalid email', async () => {
      const invalidData = { email: 'invalid-email', password: 'password123' };
      await expect(schema.validate(invalidData)).rejects.toThrow('validation.invalidEmail');
    });

    test('require email', async () => {
      const invalidData = { password: 'password123' };
      await expect(schema.validate(invalidData)).rejects.toThrow('validation.emailRequired');
    });

    test('require password', async () => {
      const invalidData = { email: 'test@example.com' };
      await expect(schema.validate(invalidData)).rejects.toThrow('validation.passwordRequired');
    });
  });

  describe('createRegisterSchema', () => {
    const schema = createRegisterSchema(t);

    test('validate valid name, email, password, and confirmPassword', async () => {
      const validData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };
      await expect(schema.validate(validData)).resolves.toBe(validData);
    });

    test('require name', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };
      await expect(schema.validate(invalidData)).rejects.toThrow('validation.nameRequired');
    });

    test('invalidate invalid email', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };
      await expect(schema.validate(invalidData)).rejects.toThrow('validation.invalidEmail');
    });

    test('validate password complexity', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'simple',
        confirmPassword: 'simple',
      };
      await expect(schema.validate(invalidData)).rejects.toThrow('validation.passwordComplexity');
    });

    test('validate password length', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'Short1!',
        confirmPassword: 'Short1!',
      };
      await expect(schema.validate(invalidData)).rejects.toThrow('validation.passwordLength');
    });

    test('validate passwords match', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Different123!',
      };
      await expect(schema.validate(invalidData)).rejects.toThrow('validation.passwordsMustMatch');
    });
  });
});
