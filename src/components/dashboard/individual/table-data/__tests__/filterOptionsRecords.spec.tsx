import { filterOptionsRequest } from "../..";

describe('filterOptionsRequest', () => {
    test('should return correct options for checker and not super admin', () => {
      const isChecker = true;
      const isSuperAdmin = false;
      const expectedOptions = ['Sent to me', 'Sent system-wide'];
      expect(filterOptionsRequest(isChecker, isSuperAdmin)).toEqual(expectedOptions);
    });
  
    test('should return correct options for checker and super admin', () => {
      const isChecker = true;
      const isSuperAdmin = true;
      const expectedOptions = ['Initiated by me', 'Initiated system-wide', 'Sent to me', 'Sent system-wide'];
      expect(filterOptionsRequest(isChecker, isSuperAdmin)).toEqual(expectedOptions);
    });
  
    test('should return correct options for not checker and not super admin', () => {
      const isChecker = false;
      const isSuperAdmin = false;
      const expectedOptions = ['Initiated by me', 'Initiated system-wide'];
      expect(filterOptionsRequest(isChecker, isSuperAdmin)).toEqual(expectedOptions);
    });
  });