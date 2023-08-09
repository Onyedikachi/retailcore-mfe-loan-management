/* eslint-disable max-len */
import * as Yup from 'yup';

export const InputFieldNames = {
   CUSTOMER_ACCOUNT_NO: 'customer_account_no',
} as const;

export const initialValues = {
   [InputFieldNames.CUSTOMER_ACCOUNT_NO]: '',
};
export const validator = () =>
   Yup.object({
      [InputFieldNames.CUSTOMER_ACCOUNT_NO]: Yup.string().required('Enter customer account'),
   });

export const TooltipText = {
   [InputFieldNames.CUSTOMER_ACCOUNT_NO]:
      'Select the account into which the principal will be disbursed for the customer',
};
