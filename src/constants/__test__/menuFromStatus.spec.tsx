import { menuFromStatus } from '../dashboard';

describe('menuFromStatus', () => {
   it('should return correct actions for Approved, Settled, and Closed menus', () => {
      expect(menuFromStatus('Approved')).toEqual(['View']);
      expect(menuFromStatus('Settled')).toEqual(['View']);
      expect(menuFromStatus('Closed')).toEqual(['View']);
   });

   it('should return correct actions for In-Issue menu', () => {
      expect(menuFromStatus('In-Issue')).toEqual(['View', 'Modify', 'Delete Request']);
   });

   it('should return correct actions for In-Review menu', () => {
      expect(menuFromStatus('In-Review')).toEqual(['View', 'Withdraw & Modify', 'Withdraw & Delete Request']);
   });

   it('should return correct actions for Draft menu', () => {
      expect(menuFromStatus('Draft')).toEqual(['Continue Request', 'Delete Request']);
   });
});
