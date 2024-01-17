import { bodyData } from '../checker-table-body';

describe('bodyData function', () => {
   const mockLoan: any = {
      status: 'In_Review',
      loanActivities: [{ createdBy: 'John Doe' }],
      lastModifiedDate: '2024-01-13T12:00:00Z',
      dateCreated: '2024-01-10T09:30:00Z',
   };

   const mockLoanActions = jest.fn();
   test('returns correct data with defined loan', () => {
      const result = bodyData(mockLoan, mockLoanActions, 'someTab');
      expect(result.request).toBe('Individual Loan Booking');
   });

   test('handles "In-Review" status case', () => {
      const inReviewLoan = { ...mockLoan, status: 'In_Review' };
      const result = bodyData(inReviewLoan, mockLoanActions, 'someTab');
      expect(result.reviewer).toBe('John Doe');
   });

   test('correctly formats date', () => {
      const result = bodyData(mockLoan, mockLoanActions, 'someTab');
      const expectedDateRegex = /(\d{1,2} [A-Za-z]+ \d{4}, \d{1,2}:\d{2} [APMapm]{2})/;
      expect(result.updatedOn).toMatch(expectedDateRegex);
   });

   test('renders chip with correct color for different status values', () => {
      const pendingLoan = { ...mockLoan, status: 'Pending' };
      const rejectedLoan = { ...mockLoan, status: 'Reject' };

      bodyData(pendingLoan, mockLoanActions, 'someTab');
      bodyData(rejectedLoan, mockLoanActions, 'someTab');
   });

   test('handles unknown status gracefully', () => {
      const unknownStatusLoan = { ...mockLoan, status: 'Unknown' };
      bodyData(unknownStatusLoan, mockLoanActions, 'someTab');
   });

   test('handles empty loanActivities gracefully', () => {
      const loanWithoutActivities = { ...mockLoan, loanActivities: [] };
      bodyData(loanWithoutActivities, mockLoanActions, 'someTab');
   });

   test('displays correct reviewer name when status is not "In-Review"', () => {
      const nonReviewLoan: any = {
         ...mockLoan,
         status: 'Pending',
         loanActivities: [{ createdBy: 'Jane Doe' }],
      };
      const result = bodyData(nonReviewLoan, mockLoanActions, 'someTab');
      expect(result.reviewer).toBe('Jane Doe');
   });

   test('handles special characters in reviewer name', () => {
      const specialCharactersLoan: any = { ...mockLoan, loanActivities: [{ createdBy: 'User@123' }] };
      bodyData(specialCharactersLoan, mockLoanActions, 'someTab');
      // Add assertions for the handling of special characters in the reviewer name
   });

   // Cleanup
   afterAll(() => {
      jest.clearAllMocks();
   });
});
