import {
   currencyToNumber,
   currencyInputFormatter,
   percentageInputFormatter,
 } from '../currency-helper';
 
 describe('currencyToNumber', () => {
   it('should convert currency strings to numbers', () => {
     expect(currencyToNumber('1,000.50')).toBe(1000.5);
     expect(currencyToNumber('1,000.001')).toBe(1000.001);
     expect(currencyToNumber('1,234.5678')).toBe(1234.5678);
     expect(currencyToNumber('1,000,000')).toBe(1000000);
   });
 });
 
 describe('currencyInputFormatter', () => {
   it('should format currency input correctly', () => {
     expect(currencyInputFormatter('100')).toEqual({
       parts: ['100'],
       originalValue: '100',
       hasDecimal: false,
       currency: '100',
       integerPart: '100',
       decimalPart: '',
     });
     expect(currencyInputFormatter('1,000.50')).toEqual({
       parts: ['1000', '50'],
       originalValue: '1,000.50',
       hasDecimal: true,
       currency: '1,000.50',
       integerPart: '1,000',
       decimalPart: '.50',
     });
     expect(currencyInputFormatter('invalid')).toEqual({
       parts: [''],
       originalValue: 'invalid',
       hasDecimal: false,
       currency: '0',
       integerPart: '0',
       decimalPart: '',
     });
     expect(currencyInputFormatter('1,234,567.890')).toEqual({
       parts: ['1234567', '890'],
       originalValue: '1,234,567.890',
       hasDecimal: true,
       currency: '1,234,567.89',
       integerPart: '1,234,567',
       decimalPart: '.89',
     });
   });
 });

 describe('percentageInputFormatter', () => {
   it('should format percentage input correctly', () => {
     expect(percentageInputFormatter('50.5')).toEqual({
       parts: ['50', '5'],
       originalValue: '50.5',
       hasDecimal: true,
       percentage: '50.5%',
       ratio: '50.5',
       integerPart: '50',
       decimalPart: '.5',
     });
     
   });
 });