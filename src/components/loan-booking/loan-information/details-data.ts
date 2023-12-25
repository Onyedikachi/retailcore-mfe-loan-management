import { eligibilityCriteria, findInterestRates } from '@app/constants/book-loan';
import { formatCurrency } from '@app/helper/currency-converter';
import { currencyToNumber } from '@app/helper/currency-helper';

export const details = (
   selectedProduct: any,
   inputtedPrincipal?: string
): Record<
   string,
   { key: string; value?: string; heading?: string; secondValue?: string; secondkey?: string }[]
> => {
   const { maxInterestRate, minInterestRate } = findInterestRates(
      selectedProduct,
      currencyToNumber(inputtedPrincipal ?? '')
   );
   const eligibility = eligibilityCriteria(selectedProduct);

   const penalty = selectedProduct?.chargesTaxesPenalty;
   const extractedInfoForAllEntries = selectedProduct?.accountingEntry?.map((entry: any) => ({
      creditLedgerName: entry.creditLedger[0]?.name,
      debitLedgerName: entry.debitLedger[0]?.name,
      accountEvent: entry.accountEvent,
   }));
   const accountEntry = extractedInfoForAllEntries?.map((entry: any) => ({
      heading: entry.accountEvent,
      key: 'Debit Ledger',
      value: entry.debitLedgerName,
      secondkey: 'Credit Ledger',
      secondValue: entry.creditLedgerName,
   }));

   return {
      facilityDetails: [
         { key: 'Currency', value: selectedProduct?.currency },
         { key: 'Min. Principal', value: formatCurrency(selectedProduct?.minLoanPrincipal ?? '') },
         { key: 'Max. Principal', value: formatCurrency(selectedProduct?.maxLoanPrincipal ?? '') },
         { key: 'Min. Interest Rate', value: Number(minInterestRate) ? `${minInterestRate}%` : '-' },
         { key: 'Max. Interest Rate', value: Number(maxInterestRate) ? `${maxInterestRate}%` : '-' },
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
                    value: `${eligibility?.contribValueFrom}% `,
                 },
              ]
            : []),
         ...(eligibility?.requireEquityContrib && eligibility?.contribValueTo
            ? [{ key: 'Max. Contribution', value: `${eligibility?.contribValueTo}%` }]
            : []),
      ],
      penaltySetup: [],
      chargesAndTaxes: [
         { key: 'Breach Penalty', value: penalty?.breachPenalty },
         { key: 'Interest Rate', value: penalty?.interestRate },
         { key: 'Penalty Required', value: penalty?.isPenaltyReq },
      ],
      // disbursementSetting: [],
      // repaymentSetting: [],
      accountEntries: accountEntry,
   };
};
export const loanProductSections = [
   'Facility Details',
   'Collateral & Equity Contribution',
   'Charges & Taxes',
   'Penalty Setup',
   'Account Entires',
];
