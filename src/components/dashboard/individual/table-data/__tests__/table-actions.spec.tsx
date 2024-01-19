import { BookedLoanData } from '@app/@types/loan-product';
import { tableQuery, handleDateQuery, handleActions } from '../table-actions';

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
         Count: 650,
         Initiator: 'INITIATEDBYME',
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
         Count: 650,
         Initiator: 'INITIATEDBYME',
      });
   });
});
describe('tableQuery function', () => {
   test('returns correct query parameters', () => {
      const searchText = 'loan';
      const queryByProductName = ['Product A', 'Product B'];
      const queryByStatus = ['Pending', 'Approved'];
      const queryByDate = ['2022-01-01', '2022-12-31'];
      const checker = true;

      const result = tableQuery(searchText, queryByProductName, queryByStatus, queryByDate, checker);

      // expect(result).toHaveValue({
      //    
      //    LoanProduct: '["Product A","Product B"]',
      //    status: '["IN_REVIEW","APPROVED"]',
      //    StartDate: '2022-01-01',
      //    EndDate: '2022-12-31',
      //    Count: 650,
      //    // Initiator: 'SENTOME',
      // });
      //    
    
   });

   // Add more test cases for different scenarios
});

describe('handleActions function', () => {
   test('navigates to CustomerLoanDetailsPath when selected action is "View"', () => {
      const selectedAction = 'View';
      const navigateMock = jest.fn();
      const item = { id: '123' };
      const setOpenLoanActionMock = jest.fn();
      const setOpenDeleteActionMock = jest.fn();

      handleActions(
         selectedAction,
         navigateMock,
         item as BookedLoanData,
         setOpenLoanActionMock,
         setOpenDeleteActionMock
      );

      expect(navigateMock).toHaveBeenCalledWith('/loan-management/customer-loan-details?id=123');
      // Add more expectations for other scenarios
   });
   test('navigates to CustomerLoanDetailsPath when selected action is "Withdraw & Modify"', () => {
      const selectedAction = 'Withdraw & Modify';
      const navigateMock = jest.fn();
      const item = { id: '123' };
      const setOpenLoanActionMock = jest.fn();
      const setOpenDeleteActionMock = jest.fn();

      handleActions(
         selectedAction,
         navigateMock,
         item as BookedLoanData,
         setOpenLoanActionMock,
         setOpenDeleteActionMock
      );

      expect(navigateMock).toHaveBeenCalledWith('/loan-management/book-loan/individual-loan?id=123');
   });
   it('navigates to CustomerLoanDetailsPath when selected action is "iquidation"', () => {
      const selectedAction = 'liquidation';
      const navigateMock = jest.fn();
      const item = { id: '123' };
      const setOpenLoanActionMock = jest.fn();
      const setOpenDeleteActionMock = jest.fn();

      handleActions(
         selectedAction,
         navigateMock,
         item as BookedLoanData,
         setOpenLoanActionMock,
         setOpenDeleteActionMock
      );

      expect(setOpenLoanActionMock).toHaveBeenCalledTimes(0);
   });
   it('navigates to CustomerLoanDetailsPath when selected action is "Close Loan"', () => {
      const selectedAction = 'Close Loan';
      const navigateMock = jest.fn();
      const item = { id: '123' };
      const setOpenLoanActionMock = jest.fn();
      const setOpenDeleteActionMock = jest.fn();

      handleActions(
         selectedAction,
         navigateMock,
         item as BookedLoanData,
         setOpenLoanActionMock,
         setOpenDeleteActionMock
      );

      expect(setOpenLoanActionMock).toHaveBeenCalledTimes(1);
   });
   it('navigates to CustomerLoanDetailsPath when selected action is "Write-Off Loan"', () => {
      const selectedAction = 'Write-Off Loan';
      const navigateMock = jest.fn();
      const item = { id: '123' };
      const setOpenLoanActionMock = jest.fn();
      const setOpenDeleteActionMock = jest.fn();

      handleActions(
         selectedAction,
         navigateMock,
         item as BookedLoanData,
         setOpenLoanActionMock,
         setOpenDeleteActionMock
      );

      expect(setOpenLoanActionMock).toHaveBeenCalledTimes(1);
   });
});

describe('handleDateQuery function', () => {
   test('sets queryByDate correctly when startDate and endDate are provided', () => {
      const startDate = new Date('2022-01-01');
      const endDate = new Date('2022-12-31');
      const setQueryByDateMock = jest.fn();

      handleDateQuery(startDate, endDate, setQueryByDateMock);

      expect(setQueryByDateMock).toHaveBeenCalledWith(['2022-01-01', '2022-12-31']);
   });
});
