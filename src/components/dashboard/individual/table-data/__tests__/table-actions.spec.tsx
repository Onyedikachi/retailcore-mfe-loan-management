import { tableQuery, handleDateQuery } from '../table-actions';

describe('menuFromStatus', () => {
   it('should return correct actions for product name, search text, status', () => {
      const searchText = 'search';
      const queryByProductName = ['product name'];
      const queryByStatus = ['status'];
      const queryByDate = ['date'];
      const queryParams = tableQuery(searchText, queryByProductName, queryByStatus, queryByDate);
      expect(queryParams).toEqual({
         LoanProduct: '["product name"]',
         Search: 'search',
         status: '["STATUS"]',
      });
   });

   it('should return correct actions for product name, search text, status', () => {
      const searchText = 'find';
      const queryByProductName = ['General Loan'];
      const queryByStatus = ['ACTIVE'];
      const queryByDate = ['date'];
      const queryParams = tableQuery(searchText, queryByProductName, queryByStatus, queryByDate);
      expect(queryParams).toEqual({
         LoanProduct: '["General Loan"]',
         Search: 'find',
         status: '["ACTIVE"]',
      });
   });
});
