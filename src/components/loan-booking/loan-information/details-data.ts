import { eligibilityCriteria, findInterestRates } from '@app/constants/book-loan';
import { formatCurrency } from '@app/helper/currency-converter';
import { currencyToNumber } from '@app/helper/currency-helper';

interface ProductDetail {
   key: string;
   value?: string;
   heading?: string;
   secondValue?: string;
   secondkey?: string;
   thirdkey?: string;
   thirdValue?: string;
   fourthkey?: string;
   fourthValue?: string;
}

export const details = (
   selectedProduct: any,
   inputtedPrincipal?: string
): Record<string, ProductDetail[]> => {
   const { maxInterestRate, minInterestRate } = findInterestRates(
      selectedProduct,
      currencyToNumber(inputtedPrincipal ?? '')
   );
   const eligibility = eligibilityCriteria(selectedProduct);

   const securityDocuments = eligibility?.eligibilityCriteriaSecurityDocs?.map(
      (documents: any, index: any) => ({
         key: `Collateral ${index + 1}`,
         value: documents.securityDocName,
      })
   );

   const penalty = selectedProduct?.chargesTaxesPenalty;
   const extractedInfoForAllEntries = selectedProduct?.accountingEntry?.map((entry: any) => ({
      creditLedgerName: entry.creditLedger[0]?.name,
      debitLedgerName: entry.debitLedger[0]?.name,
      accountEvent: entry.accountEvent,
   }));
   const accountEntry = extractedInfoForAllEntries?.map((entry: any) => ({
      heading: entry.accountEvent,
      key: 'Debit Ledger',
      value: entry?.debitLedgerName,
      secondkey: 'Credit Ledger',
      secondValue: entry?.creditLedgerName,
   }));

   const charges: any[] = [];
   const taxes: any[] = [];

   selectedProduct?.chargesTaxesPenalty?.chargeTaxEvent?.forEach((item: any, index: any) => {
      item?.chargeTaxList?.forEach((chargeTax: any) => {
         if (chargeTax?.type === 'charge') {
            charges?.push({
               chargeNumber: index + 1,
               name: chargeTax?.name,
               chargeAmount: chargeTax?.charge,
               eventName: item?.event,
               ledgers: chargeTax?.ledgers[0]?.name,
               type: 'charge',
            });
         } else if (chargeTax?.type === 'tax') {
            taxes.push({
               taxNumber: index + 1,
               name: chargeTax?.name,
               taxAmount: chargeTax?.charge,
               eventName: item?.event,
               ledgers: chargeTax?.ledgers[0]?.name,
               type: 'tax',
            });
         }
      });
   });
   const mergedArray = [...charges, ...taxes];

   const chargesAndTax = mergedArray?.map((entry: any) => ({
      heading: entry?.type === 'charge' ? `Charge ${entry?.chargeNumber}` : `Tax ${entry?.taxNumber}`,
      key: 'Event',
      value: entry?.eventName,
      secondkey: entry?.type === 'charge' ? 'Charge Name' : 'Tax Name',
      secondValue: entry?.name,
      thirdkey: 'Charge Value',
      thirdValue: entry?.type === 'charge' ? `${entry?.chargeAmount}` : `${entry?.taxAmount}`,
      fourthkey: 'Impacted Ledger',
      fourthValue: entry?.ledgers,
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
            ? [{ heading: 'Applicable collateral assets' }, ...securityDocuments]
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
      chargesAndTaxes: chargesAndTax,
      penaltySetup: [
         { heading: 'Late Payment', key: 'Breach Penalty', value: penalty?.breachPenalty },
         { key: 'Interest Rate', value: penalty?.interestRate },
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
