import { findInterestRates, eligibilityCriteria } from '../book-loan';

describe('findInterestRates function', () => {
   test('returns min and max interest rates from selected product', () => {
      const selectedProduct: any = {
         minInterestRate: 5,
         maxInterestRate: 10,
         pricingConfiguration: null,
      };

      const principal = 1000;

      const result = findInterestRates(selectedProduct, principal);

      expect(result).toEqual({
         minInterestRate: 5,
         maxInterestRate: 10,
      });
   });

   test('returns min and max interest rates from intRateConfigBand based on principal', () => {
      const selectedProduct: any = {
         minInterestRate: null,
         maxInterestRate: null,
         pricingConfiguration: {
            intRateConfigBand:
               // eslint-disable-next-line max-len
               '[{"MinPrincipalValue": "1000", "MaxPrincipalValue": "5000", "MinInterestRate": 3, "MaxInterestRate": 8}]',
         },
      };

      const principal = 3000;

      const result = findInterestRates(selectedProduct, principal);

      expect(result).toEqual({
         minInterestRate: 3,
         maxInterestRate: 8,
      });
   });

   test('handles empty selectedProduct', () => {
      const result = findInterestRates(undefined, 2000);

      expect(result).toEqual({
         minInterestRate: 0,
         maxInterestRate: 0,
      });
   });

   test('handles missing minInterestRate and maxInterestRate in selectedProduct', () => {
      const selectedProduct: any = {
         minInterestRate: null,
         maxInterestRate: null,
         pricingConfiguration: null,
      };

      const principal = 1500;

      const result = findInterestRates(selectedProduct, principal);

      expect(result).toEqual({
         minInterestRate: 0,
         maxInterestRate: 0,
      });
   });

   test('handles empty intRateConfigBand', () => {
      const selectedProduct: any = {
         minInterestRate: null,
         maxInterestRate: null,
         pricingConfiguration: {
            intRateConfigBand: '[]',
         },
      };

      const principal = 2500;

      const result = findInterestRates(selectedProduct, principal);

      expect(result).toEqual({
         minInterestRate: 0,
         maxInterestRate: 0,
      });
   });

   // Add more test cases for different scenarios
});

describe('eligibilityCriteria function', () => {
   test('returns product eligibility criteria from selected product', () => {
      const selectedProduct: any = {
         productEligibilityCriteriaRequirement: [
            { eligibilityCriteria: 'Criteria A', requireSecurity: true },
         ],
      };

      const result = eligibilityCriteria(selectedProduct);

      expect(result).toEqual({
         eligibilityCriteria: 'Criteria A',
         requireSecurity: true,
      });
   });

   test('handles empty selectedProduct', () => {
      const result = eligibilityCriteria(undefined);

      expect(result).toBeUndefined();
   });

   test('handles empty productEligibilityCriteriaRequirement', () => {
      const selectedProduct: any = {
         productEligibilityCriteriaRequirement: [],
      };

      const result = eligibilityCriteria(selectedProduct);

      expect(result).toBeUndefined();
   });
});
