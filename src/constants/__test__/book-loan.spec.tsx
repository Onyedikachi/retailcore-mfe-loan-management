import { findInterestRates, eligibilityCriteria, interestRateFinder } from '../book-loan';

const productSelected: any = {
   id: '5dcf97a0-a86d-41bb-8bfe-13253e10d492',
   name: 'guyman',
   description: 'asasssa',
   code: 'CRE048',
   type: 'Creation',
   category: 'Mortgage Finance',
   categoryId: '53a71d2c-b607-4aa0-b15a-17afbc24006a',
   currency: 'EUR',
   currencyId: '11812ffe-6894-411b-9e97-f156af7fb5f3',
   maxLoanTenure: 4,
   maxLoanTenurePeriod: 'Month(s)',
   minLoanTenure: 1,
   minLoanTenurePeriod: 'Day(s)',
   minLoanPrincipal: 14555,
   maxLoanPrincipal: 90000,
   minInterestRate: 1,
   maxInterestRate: 25,
   allowMultipleReq: false,
   isDraft: false,
   status: 'Active',
   requestStatus: 'Approved',
   createdById: '3ae782c6-5af0-403b-a9c5-1f3ce4dd9f3f',
   createdBy: 'Admin Retailcore',
   dateCreated: '2024-01-21T01:02:40.515645',
   approvedById: '3ae782c6-5af0-403b-a9c5-1f3ce4dd9f3f',
   approvedDate: '2024-01-21T01:02:40.222453',
   tenantId: '8bc60c42-ac48-4bbb-a958-6c85cf82dcbe',
   currentStep: 0,
   pricingConfiguration: {
      intCalcMethod: 'Simple Interest',
      intComputeDays: '30E/360',
      intRateConfigBand: [
         {
            minInterestRate: 1,
            maxInterestRate: 25,
            minPrincipalValue: 80000,
            maxPrincipalValue: 90000,
         },
         {
            minInterestRate: 26,
            maxInterestRate: 50,
            minPrincipalValue: 60000,
            maxPrincipalValue: 70000,
         },
         {
            minInterestRate: 51,
            maxInterestRate: 100,
            minPrincipalValue: 14555,
            maxPrincipalValue: 60000,
         },
      ],
      productId: '5dcf97a0-a86d-41bb-8bfe-13253e10d492',
      id: '48d61f29-ad11-42e8-abdb-066ad2772650',
   },

   accountingEntry: [
      {
         accountEvent: 'Interest repayment',
         debitLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'debit',
            },
         ],
         creditLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'credit',
            },
         ],
         productId: '5dcf97a0-a86d-41bb-8bfe-13253e10d492',
         id: '064950ad-7d4f-4332-b52f-83ee1aadd4b0',
      },
      {
         accountEvent: 'Disbursement',
         debitLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'debit',
            },
         ],
         creditLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'credit',
            },
         ],
         productId: '5dcf97a0-a86d-41bb-8bfe-13253e10d492',
         id: '33117792-bfb2-4966-8e1d-3e11b1587197',
      },
      {
         accountEvent: 'Principal repayment',
         debitLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'debit',
            },
         ],
         creditLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'credit',
            },
         ],
         productId: '5dcf97a0-a86d-41bb-8bfe-13253e10d492',
         id: '528a9631-cb2e-4948-919b-badb4f29f248',
      },
      {
         accountEvent: 'Penalties',
         debitLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'debit',
            },
         ],
         creditLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'credit',
            },
         ],
         productId: '5dcf97a0-a86d-41bb-8bfe-13253e10d492',
         id: '929e9d11-9ed5-4a13-b31b-4d15b01d0e5a',
      },
      {
         accountEvent: 'Interest accrual',
         debitLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'debit',
            },
         ],
         creditLedger: [
            {
               id: '2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2',
               ledger: 'ASST0RAP1252',
               gl: 'Asset',
               name: 'Asset txt 212',
               type: 'credit',
            },
         ],
         productId: '5dcf97a0-a86d-41bb-8bfe-13253e10d492',
         id: 'c2612ea4-d41f-4026-a5cd-923cf3a99c7c',
      },
   ],
};

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

describe('interestRateFinder', () => {
   it('returns null if selectedProduct or principal is not provided', () => {
      const result = interestRateFinder();
      expect(result).toBeNull();
   });

   it('returns null if principal is not in any rateConfig band', () => {
      const result = interestRateFinder(productSelected, 3000); // Principal is not in any band
      expect(result).toBeNull();
   });
   test('returns null when principal is not within any intRateConfigBand range', () => {
      expect(interestRateFinder(productSelected, 150)).toBeNull();
   });
});
