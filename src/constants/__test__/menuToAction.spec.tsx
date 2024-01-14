import { menuToAction } from '../dashboard';

describe('menuToAction', () => {
   const loanActions = ['liquidation', 'closure', 'write-off'];

   it('should return correct loan action for "Liquidate Loan"', () => {
      expect(menuToAction('Liquidate Loan')).toEqual(loanActions[0]);
   });

   it('should return correct loan action for "Close Loan"', () => {
      expect(menuToAction('Close Loan')).toEqual(loanActions[1]);
   });

   it('should return correct loan action for "Write-Off Loan"', () => {
      expect(menuToAction('Write-Off Loan')).toEqual(loanActions[2]);
   });

   it('should return undefined for an unknown menu', () => {
      expect(menuToAction('Unknown')).toBeUndefined();
   });
});
