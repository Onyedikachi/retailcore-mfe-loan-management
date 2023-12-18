import { menuActionFromStatus } from '../dashboard';

describe('menuActionFromStatus', () => {
   it('should return "View Loan Details" action for Approved, Settled, Closed, In-Issue, In-Review, and Draft menus', () => {
      expect(menuActionFromStatus('Approved')).toEqual(['View Loan Details']);
      expect(menuActionFromStatus('Settled')).toEqual(['View Loan Details']);
      expect(menuActionFromStatus('Closed')).toEqual(['View Loan Details']);
      expect(menuActionFromStatus('In-Issue')).toEqual(['View Loan Details']);
      expect(menuActionFromStatus('In-Review')).toEqual(['View Loan Details']);
      expect(menuActionFromStatus('Draft')).toEqual(['View Loan Details']);
   });

   it('should return default action "View Loan Details" for an unknown menu', () => {
      expect(menuActionFromStatus('Unknown')).toEqual(['View Loan Details']);
   });
});
