import { retrieveTableData } from '../retrieveTableData';

describe('retrieveTableData', () => {
   it('retrieves table data with skipColumn option', () => {
      const headerRow = [
         { key: 'name', title: 'Name' },
         { key: 'age', title: 'Age' },
      ];

      const body = [
         { name: 'Alice', age: 25 },
         { name: 'Bob', age: 30 },
      ];

      const config = {
         skipColumn: ['age'],
      };

      const result = retrieveTableData(headerRow, body, config);

      expect(result.headerContents).toEqual(['Name']);
      expect(result.bodyContents).toEqual([['Alice'], ['Bob']]);
   });

   it('retrieves table data without skipColumn option', () => {
      const headerRow = [
         { key: 'name', title: 'Name' },
         { key: 'age', title: 'Age' },
      ];

      const body = [
         { name: 'Alice', age: 25 },
         { name: 'Bob', age: 30 },
      ];

      const result = retrieveTableData(headerRow, body);

      expect(result.headerContents).toEqual(['Name', 'Age']);
      expect(result.bodyContents).toEqual([
         ['Alice', 25],
         ['Bob', 30],
      ]);
   });
});
