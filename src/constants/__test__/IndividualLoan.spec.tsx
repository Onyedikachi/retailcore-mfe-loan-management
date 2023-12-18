import { individualLoanFilterOptions } from '../dashboard';
describe('individualLoanFilterOptions', () => {
   
   const tabOptions = [{ key: 'exampleKey' }];
   
   it('should return filter options for records when key matches tabOptions[0]?.key', () => {
      const result1 = individualLoanFilterOptions('exampleKey', false, true, false, true);
      expect(result1).toEqual(['Initiated by me', 'Sent to me']);
      const result2 = individualLoanFilterOptions('exampleKey', false, false, false, false);
      expect(result2).toEqual(['Initiated by me']);
   });

   it('should return filter options for requests when key does not match tabOptions[0]?.key', () => {
      const result1 = individualLoanFilterOptions('differentKey', false, false, true, true);
      expect(result1).toEqual(['Initiated by me', 'Initiated system-wide', 'Sent to me', 'Sent system-wide']);
      const result2 = individualLoanFilterOptions('differentKey', true, false, false, false);
      expect(result2).toEqual(['Sent to me']);
   });
});
