import { LoanProductData } from '@app/@types/loan-product';
import { eligibilityCriteria, findInterestRates } from '@app/constants/book-loan';
import { formatCurrency } from '@app/helper/currency-converter';
import { currencyToNumber } from '@app/helper/currency-helper';

export const details = (
   selectedProduct: LoanProductData | undefined,
   inputtedPrincipal?: string
): Record<string, { key: string; value?: string; heading?: string }[]> => {
   const { maxInterestRate, minInterestRate } = findInterestRates(
      selectedProduct,
      currencyToNumber(inputtedPrincipal ?? '')
   );
   const eligibility = eligibilityCriteria(selectedProduct);

   return {
      facilityDetails: [
         { key: 'Currency', value: selectedProduct?.currency },
         { key: 'Min. Principal', value: formatCurrency(selectedProduct?.minLoanPrincipal ?? '') },
         { key: 'Max. Principal', value: formatCurrency(selectedProduct?.maxLoanPrincipal ?? '') },
         { key: 'Min. Interest Rate', value: minInterestRate ? `${minInterestRate}%` : '-' },
         { key: 'Max. Interest Rate', value: maxInterestRate ? `${maxInterestRate}%` : '-' },
         {
            key: 'Min. Loan Tenor',
            value: `${selectedProduct?.minLoanTenure} ${selectedProduct?.minLoanTenurePeriod}`,
         },

         {
            key: 'Max. Tenor',
            value: `${selectedProduct?.maxLoanTenure} ${selectedProduct?.maxLoanTenurePeriod}`,
         },
      ],
      collateral: [
         ...(eligibility?.requireSecurity
            ? [{ heading: 'Applicable collateral assets', key: 'Collateral', value: '' }]
            : []),
         ...(eligibility?.requireEquityContrib
            ? [
                 {
                    heading: 'Equity Contribution',
                    key: 'Min. Contribution',
                    value: `${eligibility?.contributionValueFrom}% `,
                 },
              ]
            : []),
         ...(eligibility?.requireEquityContrib && eligibility?.contributionValueTo
            ? [{ key: 'Max. Contribution', value: `${eligibility?.contributionValueTo}%` }]
            : []),
      ],
      chargesAndTaxes: [],
      penaltySetup: [],
      disbursementSetting: [],
      repaymentSetting: [],
      accountEntries: [],
   };
};
export const loanProductSections = [
   'Facility Details',
   'Collateral & Equity Contribution',
   'Charges & Taxes',
   'Penalty Setup',
   'Account Entires',
];
