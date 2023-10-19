/* eslint-disable max-len */
import * as Yup from 'yup';
export const InputFieldNames = {
   CUSTOMER_ACCOUNT_NO: 'acctNo',
} as const;

export type CustomerInfoFormValues = {
   [key in (typeof InputFieldNames)[keyof typeof InputFieldNames]]: string;
};

export const initialValues = (data?: CustomerInfoFormValues) => {
   return { [InputFieldNames.CUSTOMER_ACCOUNT_NO]: data?.[InputFieldNames.CUSTOMER_ACCOUNT_NO] ?? '' };
};

export const validator = () =>
   Yup.object({
      [InputFieldNames.CUSTOMER_ACCOUNT_NO]: Yup.string().required('Select customer account'),
   });

export const TooltipText = {
   [InputFieldNames.CUSTOMER_ACCOUNT_NO]:
      'Select the account of the customer for which the loan is being booked',
};
