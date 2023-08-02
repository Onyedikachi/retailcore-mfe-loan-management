import { objectDiff } from '../object-diff';

describe('objectDiff function', () => {
   it('should correctly calculate the differences between arrays of objects with compareKey', () => {
      const baseObject = [
         { id: 1, name: 'Ada' },
         { id: 3, name: 'Doe' },
      ];
      const comparingObject = [
         { id: 1, name: 'Ada' },
         { id: 5, name: 'Eve' },
      ];

      const compareKey = 'id';

      const result = objectDiff(baseObject, comparingObject, compareKey);

      expect(result.baseDiff).toEqual([{ id: 3, name: 'Doe' }]);
      expect(result.compareDiff).toEqual([{ id: 5, name: 'Eve' }]);
      expect(result.actionType).toEqual('indeterminate');
   });

   it('should calculate the differences between arrays with id when compareKey is not given', () => {
      const baseObject = [
         { id: 1, name: 'Ada' },
         { id: 3, name: 'Doe' },
      ];
      const comparingObject = [
         { id: 1, name: 'Ada' },
         { id: 5, name: 'Eve' },
      ];

      const result = objectDiff(baseObject, comparingObject);

      expect(result.baseDiff).toEqual([{ id: 3, name: 'Doe' }]);
      expect(result.compareDiff).toEqual([{ id: 5, name: 'Eve' }]);
      expect(result.actionType).toEqual('indeterminate');
   });

   it('should handle empty arrays correctly', () => {
      const result = objectDiff([], []);

      expect(result.baseDiff).toEqual([]);
      expect(result.compareDiff).toEqual([]);
      expect(result.actionType).toEqual('indeterminate');
   });

   it('should return `actionType` as `add` if baseObject is has additional value', () => {
      const baseObject = [
         { id: 1, name: 'Ada' },
         { id: 2, name: 'John' },
      ];
      const comparingObject = [{ id: 1, name: 'Ada' }];

      const result = objectDiff(baseObject, comparingObject);

      expect(result.baseDiff).toStrictEqual([{ id: 2, name: 'John' }]);
      expect(result.compareDiff).toEqual([]);
      expect(result.actionType).toBe('add');
   });

   it('should return `actionType` as `add` if baseObject is has lesser value', () => {
      const baseObject = [{ id: 1, name: 'Ada' }];
      const comparingObject = [
         { id: 1, name: 'Ada' },
         { id: 2, name: 'John' },
      ];

      const result = objectDiff(baseObject, comparingObject);

      expect(result.baseDiff).toStrictEqual([]);
      expect(result.compareDiff).toStrictEqual([{ id: 2, name: 'John' }]);
      expect(result.actionType).toBe('remove');
   });
});
