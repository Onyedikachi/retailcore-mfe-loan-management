import { bigValueFormatter, formattedDate } from '../formater';

describe('formattedDate', () => {
   it('should format date with day', () => {
      const datetime = '2023-01-15T12:00:00Z';
      const formatted = formattedDate(datetime);
      expect(formatted).toBe('15 Jan, 2023');
   });

   it('should format date without day', () => {
      const datetime = '2023-01-15T12:00:00Z';
      const formatted = formattedDate(datetime, true);
      expect(formatted).toBe('Jan, 2023');
   });
});

describe('bigValueFormatter', () => {
   it('should format numbers with long suffix', () => {
      const value = 5000;
      const formatted = bigValueFormatter(value, 'long');
      expect(formatted).toBe('5Thousand');
   });

   it('should format numbers with short suffix', () => {
      const value = 1500000;
      const formatted = bigValueFormatter(value, 'short');
      expect(formatted).toBe('1M');
   });

   it('should return the original value for values less than 1000', () => {
      const value = 500;
      const formatted = bigValueFormatter(value, 'short');
      expect(formatted).toBe('500');
   });

   it('should throw an error for non-numeric input', () => {
      const value = 'invalid';
      expect(() => {
         bigValueFormatter(value, 'long');
      }).toThrow('pass a number argument to formatter');
   });
});
