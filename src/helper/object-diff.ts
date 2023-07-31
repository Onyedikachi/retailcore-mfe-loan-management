export const objectDiff = <T>(
   baseObject: Array<T>,
   comparingObject: Array<T>,
   compareKey?: string
): {
   compareDiff: T[];
   baseDiff: T[];
   actionType: 'add' | 'remove' | 'indeterminate';
} => {
   const baseDiff = baseObject.filter((value: any) => {
      if (typeof value === 'object' && compareKey) {
         return comparingObject.every(
            (compareValue: any) => compareValue[compareKey] !== value?.[compareKey]
         );
      }

      return comparingObject.every((compareValue) => JSON.stringify(compareValue) !== JSON.stringify(value));
   });

   const compareDiff = comparingObject.filter((value: any) => {
      if (typeof value === 'object' && compareKey) {
         return baseObject.every((baseValue: any) => baseValue[compareKey] !== value?.[compareKey]);
      }

      return baseObject.every((baseValue) => JSON.stringify(baseValue) !== JSON.stringify(value));
   });

   const actionType = baseDiff.length && !compareDiff.length ? 'add' : 'indeterminate';

   return {
      compareDiff,
      baseDiff,
      actionType: !baseDiff.length && compareDiff.length ? 'remove' : actionType,
   };
};
