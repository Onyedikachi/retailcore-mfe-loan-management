import { capitalizeString } from '../string';

describe('String Helper', () => {
   it('<capitalizeString> should capitalize the first Letter of a sentence', () => {
      expect(capitalizeString('capital')).toBe('Capital');
   });
});
