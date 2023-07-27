/* eslint-disable max-len */
import { CommonFormFieldNames } from '@app/constants';
import * as Yup from 'yup';

export const InputFieldNames = {
   MIN_LOAN_TENURE_NUM: 'min_loan_tenure',
   MAX_LOAN_TENURE_NUM: 'max_loan_tenure',
   MIN_LOAN_TENURE_PERIOD: 'min_loan_tenure_period',
   MAX_LOAN_TENURE_PERIOD: 'max_loan_tenure_period',
} as const;

export const ALLOW_MULTIPLE = 'allow_multiple_req';
export const loanTenurePeriod = ['Hours', 'Days', 'Weeks', 'Months', 'Years'];

export const productInfoInitialValues = () => ({
   [CommonFormFieldNames.PRODUCT_NAME]: '',
   [CommonFormFieldNames.DESCRIPTION]: '',
   [CommonFormFieldNames.PRODUCT_CURRENCY]: 'NGN',
   [InputFieldNames.MIN_LOAN_TENURE_NUM]: 1,
   [InputFieldNames.MAX_LOAN_TENURE_NUM]: 0,
   [InputFieldNames.MIN_LOAN_TENURE_PERIOD]: 'Days',
   [InputFieldNames.MAX_LOAN_TENURE_PERIOD]: '',
   [CommonFormFieldNames.MIN_LOAN_PRINCIPAL]: '',
   [CommonFormFieldNames.MAX_LOAN_PRINCIPAL]: '',
   [ALLOW_MULTIPLE]: false,
});

export const productInfoValidator = () =>
   Yup.object({
      [CommonFormFieldNames.PRODUCT_NAME]: Yup.string()
         .required('Product name is a required')
         .max(50, 'Product name should not be more than 50 characters'),
      [CommonFormFieldNames.DESCRIPTION]: Yup.string().required('Description is required'),
      [CommonFormFieldNames.PRODUCT_CURRENCY]: Yup.string().required('Product currency is required'),
      [InputFieldNames.MIN_LOAN_TENURE_NUM]: Yup.number()
         .required('Field is required')
         .test(InputFieldNames.MAX_LOAN_TENURE_PERIOD, 'Must be greater 0', function (value) {
            return Number(value) > 0;
         }),
      [InputFieldNames.MAX_LOAN_TENURE_NUM]: Yup.number()
         .required('Field is required')
         .test(InputFieldNames.MAX_LOAN_TENURE_PERIOD, 'Must be greater 0', function (value) {
            return Number(value) > 0;
         }),
      [InputFieldNames.MIN_LOAN_TENURE_PERIOD]: Yup.string().required('Field is required'),
      [InputFieldNames.MAX_LOAN_TENURE_PERIOD]: Yup.string()
         .required('Field is required')
         .test(
            InputFieldNames.MAX_LOAN_TENURE_PERIOD,
            'Must not be lesser than min tenure',
            function (value) {
               const minLoanTenureNum = Number(this.parent?.[InputFieldNames.MIN_LOAN_TENURE_NUM]);
               const minLoanTenurePeriod = this.parent?.[InputFieldNames.MIN_LOAN_TENURE_PERIOD];
               const maxLoanTenureNum = Number(this.parent?.[InputFieldNames.MAX_LOAN_TENURE_NUM]);
               const max = loanTenurePeriod.indexOf(value);
               const min = loanTenurePeriod.indexOf(minLoanTenurePeriod);
               if (max == min && maxLoanTenureNum >= minLoanTenureNum) {
                  return true;
               } else if (max >= min && maxLoanTenureNum) {
                  return true;
               } else return false;
            }
         ),
      [CommonFormFieldNames.MIN_LOAN_PRINCIPAL]: Yup.string().required('Min loan principal is required'),
      [CommonFormFieldNames.MAX_LOAN_PRINCIPAL]: Yup.string()
         .required('Max loan principal is required')
         .test(
            CommonFormFieldNames.MAX_LOAN_PRINCIPAL,
            'Must not be lesser than min loan principal',
            function (value) {
               const minLoanPrincipal = this.parent?.[CommonFormFieldNames.MIN_LOAN_PRINCIPAL];
               const maxPrincipal = Number(value.replace(/,/g, ''));
               const minPrincipal = Number(minLoanPrincipal.replace(/,/g, ''));
               return maxPrincipal >= minPrincipal;
            }
         ),
      [ALLOW_MULTIPLE]: Yup.boolean(),
   });

export const ToolTipText = {
   [InputFieldNames.MIN_LOAN_TENURE_PERIOD]:
      'Specify the minimum allowable tenure that holds the duration for the least possible life span of the loan',
   [InputFieldNames.MAX_LOAN_TENURE_PERIOD]:
      'Specify the maximum allowable tenure that holds the duration for the highest possible life span of the loan',
   [ALLOW_MULTIPLE]: 'Allows the borrower have access to other loan products while holding this product',
};
