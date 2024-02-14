import { comparePaths } from '../compare-path';

describe('comparePaths', () => {
   it('should compare paths correctly', () => {
      const testCases = [
         { base: '/path1/', compare: '/path1/', expected: true },
         { base: '/path1', compare: '/path1/', expected: true },
         { base: '/path1', compare: '/path2', expected: false },
         { base: '/path1', compare: '/path1/subpath', expected: false },
         { base: '/path1/subpath', compare: '/path1', expected: false },
      ];

      testCases.forEach((testCase) => {
         const { base, compare, expected } = testCase;
         const result = comparePaths(base, compare);
         expect(result).toEqual(expected);
      });
   });

   test('returns true for identical paths', () => {
      const base = '/home';
      const compare = '/home';
      expect(comparePaths(base, compare)).toBe(true);
   });

   test('returns true for paths with trailing slashes', () => {
      const base = '/home/';
      const compare = '/home';
      expect(comparePaths(base, compare)).toBe(true);
   });

   test('returns false for different paths', () => {
      const base = '/home';
      const compare = '/about';
      expect(comparePaths(base, compare)).toBe(false);
   });

   test('returns false for paths with different trailing slashes', () => {
      const base = '/home/';
      const compare = '/home/about/';
      expect(comparePaths(base, compare)).toBe(false);
   });

   test('returns true for empty paths', () => {
      const base = '';
      const compare = '';
      expect(comparePaths(base, compare)).toBe(true);
   });
});
