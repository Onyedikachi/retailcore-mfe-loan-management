import { modifyLoan } from '../dashboard';

describe('modifyLoan', () => {
    it('should return true for "Withdraw & Modify" action', () => {
       const result = modifyLoan('Withdraw & Modify');
       expect(result).toBe(true);
    });
 
    it('should return true for "Modify" action', () => {
       const result = modifyLoan('Modify');
       expect(result).toBe(true);
    });
 
    it('should return true for "Continue Request" action', () => {
       const result = modifyLoan('Continue Request');
       expect(result).toBe(true);
    });
 
    it('should return false for other actions', () => {
       const result = modifyLoan('Some Other Action');
       expect(result).toBe(false);
    });
 });
