/* eslint-disable max-len */
import * as Yup from 'yup';
export type FormValues = typeof initialValues;
export const InputFieldNames = {
   CUSTOMER_ACCOUNT_NO: 'customer_account_no',
} as const;

export const initialValues = {
   [InputFieldNames.CUSTOMER_ACCOUNT_NO]: '',
};
export const validator = () =>
   Yup.object({
      [InputFieldNames.CUSTOMER_ACCOUNT_NO]: Yup.string().required('Select customer account'),
   });

export const TooltipText = {
   [InputFieldNames.CUSTOMER_ACCOUNT_NO]:
      'Select the account of the customer for which the loan is being booked',
};
