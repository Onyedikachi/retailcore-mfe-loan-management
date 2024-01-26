import { parseISO } from 'date-fns';
import { bigValueFormatter, formattedDate, parseDateString } from '../formater';

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
describe('parseDateString', () => {
   test('returns undefined for invalid date strings', () => {
      expect(parseDateString('invalidDateString')).toBeUndefined();
      expect(parseDateString('2022-99-99')).toBeUndefined();
   });

   test('returns ISO date string for valid ISO date strings', () => {
      const validISODate = '2022-01-26T12:34:56.789Z';
      expect(parseDateString(validISODate)).toBe(validISODate);
   });

   test('returns ISO date string for valid custom format date strings', () => {
      const validCustomFormatDate = '26/01/2022';
      const expectedISOString = parseISO('2022-01-25T23:00:00.000Z').toISOString();
      expect(parseDateString(validCustomFormatDate)).toBe(expectedISOString);
   });

   test('returns undefined for invalid custom format date strings', () => {
      const invalidCustomFormatDate = '99/99/2022';
      expect(parseDateString(invalidCustomFormatDate)).toBeUndefined();
   });

   test('handles various valid date formats', () => {
      const validISODate = '2022-01-26T12:34:56.789Z';
      const validCustomFormatDate = '26/01/2022';

      expect(parseDateString(validISODate)).toBe(validISODate);
      expect(parseDateString(validCustomFormatDate)).toBe(parseISO('2022-01-25T23:00:00.000Z').toISOString());
   });

   test('handles both valid ISO and custom format date strings', () => {
      const validMixedDate = '2022-01-26T12:34:56.789Z';
      expect(parseDateString(validMixedDate)).toBe(validMixedDate);
   });
});
