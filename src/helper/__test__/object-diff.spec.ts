import { objectDiff } from '../object-diff';

describe('objectDiff function', () => {
   it('should correctly calculate the differences between arrays of objects with compareKey', () => {
      const baseObject = [
         { id: 1, name: 'Ada' },
         { id: 2, name: 'John' },
         { id: 3, name: 'Doe' },
      ];

      const comparingObject = [
         { id: 1, name: 'Ada' },
         { id: 4, name: 'Adam' },
         { id: 5, name: 'Eve' },
      ];

      const compareKey = 'id';

      const result = objectDiff(baseObject, comparingObject, compareKey);

      expect(result.baseDiff).toEqual([
         { id: 2, name: 'John' },
         { id: 3, name: 'Doe' },
      ]);
      expect(result.compareDiff).toEqual([
         { id: 4, name: 'Adam' },
         { id: 5, name: 'Eve' },
      ]);
      expect(result.actionType).toEqual('indeterminate');
   });

   it('should correctly calculate the differences between arrays of objects without compareKey', () => {
      const baseObject = [
         { id: 1, name: 'Ada' },
         { id: 2, name: 'John' },
         { id: 3, name: 'Doe' },
      ];

      const comparingObject = [
         { id: 2, name: 'John' },
         { id: 4, name: 'Adam' },
         { id: 5, name: 'Eve' },
      ];

      const result = objectDiff(baseObject, comparingObject);

      expect(result.baseDiff).toEqual([
         { id: 1, name: 'Ada' },
         { id: 3, name: 'Doe' },
      ]);
      expect(result.compareDiff).toEqual([
         { id: 4, name: 'Adam' },
         { id: 5, name: 'Eve' },
      ]);
      expect(result.actionType).toEqual('indeterminate');
   });

   it('should handle empty arrays correctly', () => {
      const baseObject: any[] = [];
      const comparingObject: any[] = [];

      const result = objectDiff(baseObject, comparingObject);

      expect(result.baseDiff).toEqual([]);
      expect(result.compareDiff).toEqual([]);
      expect(result.actionType).toEqual('indeterminate');
   });

   it('should handle arrays with the same objects correctly', () => {
      const baseObject = [
         { id: 1, name: 'Ada' },
         { id: 2, name: 'John' },
      ];

      const comparingObject = [
         { id: 1, name: 'Ada' },
         { id: 2, name: 'John' },
      ];

      const result = objectDiff(baseObject, comparingObject);

      expect(result.baseDiff).toEqual([]);
      expect(result.compareDiff).toEqual([]);
      expect(result.actionType).toEqual('indeterminate');
   });
});
