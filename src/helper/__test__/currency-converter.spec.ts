import { currencyToNumber } from '../currency-converter';

describe('currencyToNumber', () => {
   it('should convert currency string to a number', () => {
      const currencyString = '1,234.56'; // Replace with the currency format you want to test
      const expectedResult = 1234.56;
      const result = currencyToNumber(currencyString);
      expect(result).toBe(expectedResult);
   });

   it('should handle a number and return it as is', () => {
      const number = 42; // Replace with the number you want to test
      const result = currencyToNumber(number);
      expect(result).toBe(number);
   });

   it('should handle undefined or null input', () => {
      const result = currencyToNumber();
      expect(result).toBe(0);

      const result2 = currencyToNumber();
      expect(result2).toBe(0);
   });
});
