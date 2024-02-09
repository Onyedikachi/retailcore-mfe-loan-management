import { menuToAPIAction } from '../dashboard';

describe('menuToAPIAction', () => {
   it('should return "LIQUIDATE" for action "liquidation"', () => {
      expect(menuToAPIAction('liquidation')).toEqual('LIQUIDATE');
   });

   it('should return "CLOSED" for action "closure"', () => {
      expect(menuToAPIAction('closure')).toEqual('CLOSED');
   });

   it('should return "WRITEOFFLOAN" for action "write-off"', () => {
      expect(menuToAPIAction('write-off')).toEqual('WRITE_OFF_LOAN');
   });

   it('should return undefined for an unknown action', () => {
      expect(menuToAPIAction('Unknown')).toBeUndefined();
   });
});
