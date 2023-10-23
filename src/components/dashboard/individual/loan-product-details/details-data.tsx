import { BookedLoanData } from '@app/@types/loan-product';

export const bookingInfo = (loanProduct: BookedLoanData | undefined) => {
   return [
      { key: 'Loan product name', value: '' },
      { key: 'Loan product category', value: '' },
      { key: 'Loan purpose', value: loanProduct?.productPurpose },
      { key: 'Loan product currency', value: '' },
      { key: 'Principal ', value: loanProduct?.principal },
      { key: 'Interest rate', value: loanProduct?.interestRate.toString() },
      {
         key: 'Loan tenor',
         value: `${loanProduct?.tenorValue} ${loanProduct?.tenorPeriod}`,
      },
      { key: 'Repayment pattern', value: loanProduct?.repaymentPattern },
      { key: 'Repayment frequency', value: loanProduct?.repaymentFrequency },
      { key: 'Repayment channel', value: loanProduct?.repaymentChannel },
      { key: 'Repayment account', value: loanProduct?.repaymentAcct },
      {
         key: 'Moratorium period',
         value: `${loanProduct?.moratoriumValue} ${loanProduct?.moratoriumPeriod ?? ''}`,
      },
      {
         key: 'Grace period',
         value: `${loanProduct?.graceValue} ${loanProduct?.gracePeriod}`,
      },
      { key: 'Disbursement method', value: loanProduct?.disburseMethd },
      {
         key: 'Disbursement account',
         value: loanProduct?.disburseAcct,
      },
      { key: 'Disbursement date', value: loanProduct?.disburseDate },
   ];
};

export const customerInfo = (loanProduct: BookedLoanData | undefined) => {
   return [
      { key: 'Customer Name', value: loanProduct?.customerName, view: true },
      { key: 'Account Number', value: loanProduct?.acctNo },
      { key: 'BVN', value: loanProduct?.bvn },
      { key: 'Product Currency', value: '' },
      { key: 'Product Lifecycle', value: '' },
   ];
};
export const collateralInfo = (loanProduct: BookedLoanData | undefined) => {
   return loanProduct?.loanAssets && loanProduct?.loanAssets.length > 0
      ? [
           { key: 'Collateral Type', value: '-' },
           { key: 'Address', value: '-' },
           { key: 'Value', value: '' },
        ]
      : [];
};
