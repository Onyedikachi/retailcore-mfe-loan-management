import { BookLoanData } from '@app/@types/book-loan';
import { CustomerData } from '@app/@types/customer';
import { LoanProductData } from '@app/@types/loan-product';
import { parseDateString } from '@app/helper/formater';
import { format } from 'date-fns';

export const bookingInfo = (loan?: BookLoanData, selectedProduct?: LoanProductData) => {
   const disbursementDate = loan?.transactionSettings?.disburseDate
      ? parseDateString(loan?.transactionSettings?.disburseDate)
      : undefined;

   return [
      { key: 'Loan product name', value: loan?.facilityDetails?.product_name ?? '' },
      { key: 'Loan product category', value: selectedProduct?.category ?? '' },
      { key: 'Loan purpose', value: loan?.facilityDetails?.productPurpose ?? '' },
      { key: 'Loan product currency', value: selectedProduct?.currency ?? '' },
      { key: 'Principal ', value: loan?.facilityDetails?.principal ?? '' },
      { key: 'Interest rate', value: loan?.facilityDetails?.interestRate ?? '' },
      {
         key: 'Loan tenor',
         value: `${loan?.facilityDetails?.tenorValue ?? ''} ${loan?.facilityDetails?.tenorPeriod ?? ''}`,
      },
      { key: 'Repayment pattern', value: loan?.facilityDetails?.repayment_pattern ?? '' },
      { key: 'Repayment frequency', value: loan?.facilityDetails?.repayment_frequency ?? '' },
      { key: 'Repayment channel', value: loan?.transactionSettings?.repaymentChannel ?? '' },
      { key: 'Repayment account', value: loan?.transactionSettings?.repaymentAcct ?? '' },
      {
         key: 'Moratorium period',
         value: `${loan?.facilityDetails?.moratoriumValue ?? ''} ${
            loan?.facilityDetails?.moratoriumPeriod ?? ''
         }`,
      },
      {
         key: 'Grace period',
         value: `${loan?.facilityDetails?.graceValue ?? ''} ${loan?.facilityDetails?.gracePeriod ?? ''}`,
      },
      { key: 'Disbursement method', value: loan?.transactionSettings?.disburseMethd ?? '' },
      {
         key: 'Disbursement account',
         value: loan?.transactionSettings?.disburseAcct ?? '',
      },
      {
         key: 'Disbursement date',
         value: disbursementDate ? format(new Date(disbursementDate), 'd MMM yyyy, hh:mm a') : '',
      },
   ];
};

export const customerInfo = (selectedCustomer?: CustomerData | undefined, loan?: BookLoanData) => {
   const profile = selectedCustomer?.customer_profiles[0];
   return [
      {
         key: 'Customer Name',
         value: `${profile?.firstName ?? ''} ${profile?.otherNames ?? ''} ${profile?.surname ?? ''}`,
         view: true,
      },
      { key: 'Account Number', value: loan?.customerInformation?.acctNo },
      { key: 'BVN', value: profile?.bvn },
   ];
};
