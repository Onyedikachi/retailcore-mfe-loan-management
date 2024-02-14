import * as Yup from 'yup';
import { Fields, initialValues, validationSchema, FormValues } from '../customer-date-range';

describe('Form validation', () => {
   test('initialValues should have start date and end date as empty strings', () => {
      expect(initialValues).toEqual({ startDate: '', endDate: '' });
   });

   test('validationSchema should require start date', async () => {
      const schema = validationSchema;
      const validData: FormValues = { startDate: '2024-01-01', endDate: '2024-01-31' };
      const invalidData: FormValues = { startDate: '', endDate: '2024-01-31' };

      await expect(schema.validate(validData)).resolves.toBe(validData);
      await expect(schema.validate(invalidData)).rejects.toThrow();
   });

   test('validationSchema should require end date', async () => {
      const schema = validationSchema;
      const validData: FormValues = { startDate: '2024-01-01', endDate: '2024-01-31' };
      const invalidData: FormValues = { startDate: '2024-01-01', endDate: '' };

      await expect(schema.validate(validData)).resolves.toBe(validData);
      await expect(schema.validate(invalidData)).rejects.toThrow();
   });

   test('validationSchema should accept valid dates', async () => {
      const schema = validationSchema;
      const validData: FormValues = { startDate: '2024-01-01', endDate: '2024-01-31' };

      await expect(schema.validate(validData)).resolves.toBe(validData);
   });

   test('validationSchema should allow equal start and end dates', async () => {
      const schema = validationSchema;
      const validData: FormValues = { startDate: '2024-01-15', endDate: '2024-01-15' };

      await expect(schema.validate(validData)).resolves.toBe(validData);
   });

   test('validationSchema should reject end date if start date is missing', async () => {
      const schema = validationSchema;
      const invalidData: FormValues = { startDate: '', endDate: '2024-01-15' };

      await expect(schema.validate(invalidData)).rejects.toThrow();
   });

   test('validationSchema should reject start date if end date is missing', async () => {
      const schema = validationSchema;
      const invalidData: FormValues = { startDate: '2024-01-15', endDate: '' };

      await expect(schema.validate(invalidData)).rejects.toThrow();
   });
});
