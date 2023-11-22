import { CustomerData } from '@app/@types/customer';
import { BookedLoanData } from '@app/@types/loan-product';
import { mapSchemaToBookLoan } from '@app/mappers/book-loan-mapper';

export const detailsList = (loanProduct?: BookedLoanData, selectedCustomer?: CustomerData) => {
   const loanData = loanProduct ? mapSchemaToBookLoan(loanProduct) : {};
   return [
      {
         title: 'Customer Information',
         details: [
            { key: 'Customer Name', value: loanProduct?.customerName, view: true },
            { key: 'Account Number', value: loanProduct?.acctNo },
            { key: 'Customer Type', value: selectedCustomer?.customerType },
            { key: 'Status', value: selectedCustomer?.status },
            { key: 'BVN', value: loanProduct?.bvn },
            { key: 'Phone Number', value: selectedCustomer?.customer_profiles[0]?.mobileNumber },
            { key: 'Email Address', value: selectedCustomer?.customer_profiles[0]?.emailAddress },
         ],
      },
      {
         title: 'Facility Details',
         details: [
            { key: 'Product name', value: loanData?.facilityDetails?.product_name },
            { key: 'Product category', value: loanProduct?.product?.category },
            { key: 'Product currency', value: loanProduct?.product?.currency },
            { key: 'Principal', value: loanProduct?.principal },
            { key: 'Interest rate', value: loanProduct?.interestRate.toString() },
            { key: 'Tenor', value: `${loanProduct?.tenorValue} ${loanProduct?.tenorPeriod}` },
            { key: 'Total Payable', value: '-' },
            { key: 'Repayment Pattern', value: loanProduct?.repaymentPattern },
            { key: 'Repayment Frequency', value: loanProduct?.repaymentFrequency },
            { key: 'Start Date', value: loanProduct?.repaymentFrequencyStartDate },
            { key: 'Interval', value: `${loanProduct?.repaymentFrequencyValue} ${loanProduct?.tenorPeriod}` },
            { key: 'Repayment Ammount', value: '-' },
         ],
      },
      {
         title: 'Collateral and Equity Contribution',
         details: [
            { key: 'Equity Contribution', value: '-' },
            { heading: 'Collateral 1', key: 'Collateral Type', value: '-' },
            { key: 'Market value', value: '-' },
            { key: 'Documment', value: '-', file: '-' },
         ],
      },
      {
         title: 'Loan Management Settings',
         details: [
            {
               key: 'Moratorium period',
               value: `${loanProduct?.moratoriumValue} ${loanProduct?.moratoriumPeriod ?? ''}`,
            },
            { key: 'Duration', value: loanProduct?.moratoriumDuration },
            { key: 'Grace Period', value: `${loanProduct?.graceValue} ${loanProduct?.gracePeriod}` },
         ],
      },
      {
         title: 'Repayment Settings',
         details: [
            { key: 'Repayment Channel', value: loanProduct?.repaymentChannel },
            { key: 'Repayment Source', value: loanProduct?.repaymentAcct },
         ],
      },
      {
         title: 'Accounting Enteries',
         details: [
            { heading: 'Disbursement', key: 'Debit Ledger', value: '-' },
            { key: 'Credit ledger', value: '-' },
         ],
      },
   ];
};
