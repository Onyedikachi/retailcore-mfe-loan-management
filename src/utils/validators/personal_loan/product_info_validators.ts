/* eslint-disable max-len */
import * as Yup from 'yup';

export const PRODUCT_NAME = 'productName';
export const DESCRIPTION = 'description';
export const PRODUCT_CURRENCY = 'productCurrency';
export const MIN_LOAN_TENURE_NUM = 'minLoanTenureNum';
export const MAX_LOAN_TENURE_NUM = 'maxLoanTenureNum';
export const MIN_LOAN_TENURE_PERIOD = 'minLoanTenurePeriod';
export const MAX_LOAN_TENURE_PERIOD = 'maxLoanTenurePeriod';
export const MIN_LOAN_PRINCIPAL = 'minLoanPrincipal';
export const MAX_LOAN_PRINCIPAL = 'maxLoanPrincipal';

export const ALLOW_MULTIPLE = 'allowMultiple';
export const loanTenurePeriod = ['Hours', 'Days', 'Weeks', 'Months', 'Years'];

export const productInfoInitialValues = {
   [PRODUCT_NAME]: '',
   [DESCRIPTION]: '',
   [PRODUCT_CURRENCY]: '',
   [MIN_LOAN_TENURE_NUM]: '',
   [MAX_LOAN_TENURE_NUM]: '',
   [MIN_LOAN_TENURE_PERIOD]: '',
   [MAX_LOAN_TENURE_PERIOD]: '',
   [MIN_LOAN_PRINCIPAL]: '',
   [MAX_LOAN_PRINCIPAL]: '',
   [ALLOW_MULTIPLE]: false,
};

export const productInfoValidator = Yup.object({
   [PRODUCT_NAME]: Yup.string()
      .required('Product name is a required')
      .max(50, 'Product name should not be more than 50 characters'),
   [DESCRIPTION]: Yup.string().required('Description is required'),
   [PRODUCT_CURRENCY]: Yup.string().required('Product currency is required'),
   [MIN_LOAN_TENURE_NUM]: Yup.number()
      .required('Field is required')
      .test(MAX_LOAN_TENURE_PERIOD, 'Must be greater 0', function (value) {
         return Number(value) > 0;
      }),
   [MAX_LOAN_TENURE_NUM]: Yup.number()
      .required('Field is required')
      .test(MAX_LOAN_TENURE_PERIOD, 'Must be greater 0', function (value) {
         return Number(value) > 0;
      }),
   [MIN_LOAN_TENURE_PERIOD]: Yup.string().required('Field is required'),
   [MAX_LOAN_TENURE_PERIOD]: Yup.string()
      .required('Field is required')
      .test(MAX_LOAN_TENURE_PERIOD, 'Must be greater than min tenure', function (value) {
         const { minLoanTenurePeriod, minLoanTenureNum, maxLoanTenureNum } = this.parent;
         const max = loanTenurePeriod.indexOf(value);
         const min = loanTenurePeriod.indexOf(minLoanTenurePeriod);
         if (max == min && Number(maxLoanTenureNum) > Number(minLoanTenureNum)) {
            return true;
         } else if (max > min && Number(maxLoanTenureNum)) {
            return true;
         } else return false;
      }),
   [MIN_LOAN_PRINCIPAL]: Yup.string().required('Min loan principal is required'),
   [MAX_LOAN_PRINCIPAL]: Yup.string()
      .required('Max loan principal is required')
      .test(MAX_LOAN_PRINCIPAL, 'Max loan tenure must not be lesser than min loan tenure', function (value) {
         const { minLoanPrincipal } = this.parent;
         const maxPrincipal = Number(value.replace(/,/g, ''));
         const minPrincipal = Number(minLoanPrincipal.replace(/,/g, ''));
         // const currencyRegex = /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/;
         // return currencyRegex.test(value.replace(/,/g, ''));
         return maxPrincipal > minPrincipal;
      }),
   [ALLOW_MULTIPLE]: Yup.boolean(),
});

export const toolTipText = {
   [PRODUCT_NAME]: 'Enter a product name for this loan product',
   [DESCRIPTION]: 'Enter a description for this loan product ',
   [PRODUCT_CURRENCY]: 'Select an applicable currency for this loan product ',
   [MIN_LOAN_TENURE_PERIOD]:
      'Specify the minimum allowable tenure that holds the duration for the least possible life span of the loan',
   [MAX_LOAN_TENURE_PERIOD]:
      'Specify the maximum allowable tenure that holds the duration for the highest possible life span of the loan',
   [MIN_LOAN_PRINCIPAL]:
      'Specify the minimum amount of money that can be borrowed as the principal for this loan product',
   [MAX_LOAN_PRINCIPAL]:
      'Specify the maximum amount of money that can be borrowed as the principal for this loan product',
   [ALLOW_MULTIPLE]: 'Allows the borrower have access to other loan products while holding this product',
};
