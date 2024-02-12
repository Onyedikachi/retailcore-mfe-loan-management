import { filterOptionsRecords } from "../..";

describe('filterOptionsRecords', () => {
    test('should return correct options for checker and not super admin', () => {
      const isChecker = true;
      const isSuperAdmin = false;
      const expectedOptions = ['Approved by me', 'Approved system-wide'];
      expect(filterOptionsRecords(isChecker, isSuperAdmin)).toEqual(expectedOptions);
    });
  
    test('should return correct options for checker and super admin', () => {
      const isChecker = true;
      const isSuperAdmin = true;
      const expectedOptions = ['Created by me', 'Created system-wide', 'Approved by me', 'Approved system-wide'];
      expect(filterOptionsRecords(isChecker, isSuperAdmin)).toEqual(expectedOptions);
    });
  
    test('should return correct options for not checker and not super admin', () => {
      const isChecker = false;
      const isSuperAdmin = false;
      const expectedOptions = ['Created by me', 'Created system-wide'];
      expect(filterOptionsRecords(isChecker, isSuperAdmin)).toEqual(expectedOptions);
    });
  });