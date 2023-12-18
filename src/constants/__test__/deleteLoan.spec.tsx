import { deleteLoan } from '../dashboard';

describe('deleteLoan', () => {
    it('should return true for "Delete Request" action', () => {
       const result = deleteLoan('Delete Request');
       expect(result).toBe(true);
    });
 
    it('should return true for "Withdraw & Delete Request" action', () => {
       const result = deleteLoan('Withdraw & Delete Request');
       expect(result).toBe(true);
    });
 
    it('should return false for other actions', () => {
       const result = deleteLoan('Some Other Action');
       expect(result).toBe(false);
    });
 });