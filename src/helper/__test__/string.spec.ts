import { capitalizeString, compareString, stringContains } from '../string';

describe('String Helper', () => {
   it('<capitalizeString> should capitalize the first letter of a sentence', () => {
      expect(capitalizeString('capital')).toBe('Capital');
   });

   it('<capitalizeString> should not change a sentence with already capitalized first letter', () => {
      expect(capitalizeString('Capital')).toBe('Capital');
   });

   it('<capitalizeString> should capitalize the first letter of a single character', () => {
      expect(capitalizeString('a')).toBe('A');
   });

   it('<compareString> should return true for two equal strings', () => {
      expect(compareString('hello', 'hello')).toBe(true);
   });

   it('<compareString> should return true for two equal strings with different case', () => {
      expect(compareString('Hello', 'HELLO')).toBe(true);
   });

   it('<compareString> should return false for two different strings', () => {
      expect(compareString('hello', 'world')).toBe(false);
   });

   it('<stringContains> should return true for substring present in the string', () => {
      expect(stringContains('hello', 'ell')).toBe(true);
   });

   it('<stringContains> should return true for substring present in the string with different case', () => {
      expect(stringContains('Hello', 'ell')).toBe(true);
   });

   it('<stringContains> should return false for substring not present in the string', () => {
      expect(stringContains('hello', 'abc')).toBe(false);
   });

   it('<stringContains> should return true for an empty substring', () => {
      expect(stringContains('hello', '')).toBe(true);
   });
});
