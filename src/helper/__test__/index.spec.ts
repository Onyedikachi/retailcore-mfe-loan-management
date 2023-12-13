import { isNullish } from '../index'; // Adjust the path accordingly

describe('isNullish', () => {
   test('should return true for null value', () => {
      const value = null;
      const result = isNullish(value);
      expect(result).toBe(true);
   });

   test('should return true for undefined value', () => {
      const value = undefined;
      const result = isNullish(value);
      expect(result).toBe(true);
   });

   test('should return false for non-nullish value', () => {
      const value = 'some value';
      const result = isNullish(value);
      expect(result).toBe(false);
   });

   test('should return false for numeric value', () => {
      const value = 42;
      const result = isNullish(value);
      expect(result).toBe(false);
   });

   test('should return false for boolean value', () => {
      const value = true;
      const result = isNullish(value);
      expect(result).toBe(false);
   });

   test('should return false for empty string value', () => {
      const value = '';
      const result = isNullish(value);
      expect(result).toBe(false);
   });

   test('should return false for object value', () => {
      const value = { key: 'value' };
      const result = isNullish(value);
      expect(result).toBe(false);
   });

   test('should return false for array value', () => {
      const value = [1, 2, 3];
      const result = isNullish(value);
      expect(result).toBe(false);
   });
});
