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
});
