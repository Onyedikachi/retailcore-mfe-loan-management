/* eslint-disable max-len */

import * as Yup from 'yup';
export const InputFieldNames = {
   DISBURSEMENT_METHOD: 'disbursement_method',
   DISBURSEMENT_ACCOUNT: 'disbursement_account',
   DISBURSEMENT_DATE: 'disbursement_date',
   OTHER_ACCOUNT_NO: 'other_account_no',
   ENABLE_DISBURSEMENT_NOTIFICATION: 'enable_disbursement_notification',
   NOTIFICATION_CHANNEL: 'notification_channel',
   REPAYMENT_CHANNEL: 'repayment_channel',
   REPAYMENT_ACCOUNT: 'repayment_account',
} as const;
export type TransactionSettingsFormValues = {
   [key in (typeof InputFieldNames)[keyof typeof InputFieldNames]]: key extends
      | 'enable_disbursement_notification'
      ? boolean
      : key extends 'notification_channel'
      ? string[]
      : string;
};
export const accordionLabels = ['Disbursement Settings', 'Repayment Settings'];

export const disbursementMethods = ['On Approval', 'Schedule Disbursement Date'];
export const disbursementAccounts = ['Customer’s Account', 'Suspense Account', 'Other Customers’ Account'];

export const initialValues = (data?: TransactionSettingsFormValues) => {
   return {
      [InputFieldNames.DISBURSEMENT_METHOD]: data?.[InputFieldNames.DISBURSEMENT_METHOD] ?? '',
      [InputFieldNames.DISBURSEMENT_ACCOUNT]: data?.[InputFieldNames.DISBURSEMENT_ACCOUNT] ?? '',
      [InputFieldNames.DISBURSEMENT_DATE]: data?.[InputFieldNames.DISBURSEMENT_DATE] ?? '',
      [InputFieldNames.OTHER_ACCOUNT_NO]: data?.[InputFieldNames.OTHER_ACCOUNT_NO] ?? '',
      [InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION]:
         data?.[InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION] ?? false,
      [InputFieldNames.NOTIFICATION_CHANNEL]: data?.[InputFieldNames.NOTIFICATION_CHANNEL] ?? [],
      [InputFieldNames.REPAYMENT_CHANNEL]: data?.[InputFieldNames.REPAYMENT_CHANNEL] ?? '',
      [InputFieldNames.REPAYMENT_ACCOUNT]: data?.[InputFieldNames.REPAYMENT_ACCOUNT] ?? '',
   };
};

export const repaymentChannels = [
   { value: 'Direct Debit' },
   { value: 'Card Tokenization', disable: true },
   { value: 'Remita', disable: true },
   { value: 'NIBBS', disable: true },
];
export const repaymentAccount = [
   'Deduct from customer’s primary account',
   'Deduct from customer’s other accounts',
];
export const validator = () =>
   Yup.object({
      [InputFieldNames.DISBURSEMENT_METHOD]: Yup.string().required('Select disbursement method'),
      [InputFieldNames.DISBURSEMENT_ACCOUNT]: Yup.string().required('Select disbursement account'),
      [InputFieldNames.DISBURSEMENT_DATE]: Yup.string().when(
         InputFieldNames.DISBURSEMENT_METHOD,
         (disbursementMethod, field) =>
            disbursementMethod?.[0] === disbursementMethods[1]
               ? field.required('Select disbursement date')
               : field
      ),
      [InputFieldNames.OTHER_ACCOUNT_NO]: Yup.string().when(
         InputFieldNames.DISBURSEMENT_ACCOUNT,
         (disbursementAccount, field) =>
            disbursementAccount?.[0] === disbursementAccounts[2]
               ? field.required('Select account number')
               : field
      ),
      [InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION]: Yup.boolean(),
      [InputFieldNames.NOTIFICATION_CHANNEL]: Yup.array().when(
         InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION,
         (enableNotification, field) =>
            enableNotification?.[0]
               ? field.min(1, 'Select one notification channel').required('Select one notification channel')
               : field
      ),
      [InputFieldNames.REPAYMENT_ACCOUNT]: Yup.string().required('Select repayemnt account'),
      [InputFieldNames.REPAYMENT_CHANNEL]: Yup.string().required('Select repayment channel'),
   });

export const TooltipText = {
   [InputFieldNames.DISBURSEMENT_METHOD]: 'Select when the principal will be disbursed to the customer',
   [InputFieldNames.DISBURSEMENT_ACCOUNT]:
      'Select the account into which the principal is to be disbursed for the customer',
   [InputFieldNames.DISBURSEMENT_DATE]: 'Set the exact date on which the principal will be disbursed',
   [InputFieldNames.OTHER_ACCOUNT_NO]:
      'Select the 3rd-party account to which the principal is to be disbursed into for the customer',
   [InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION]:
      'Do you want to notify the customer when the principal has been disbursed?',
   [InputFieldNames.NOTIFICATION_CHANNEL]:
      'Indicate the channels through which the disbursement notification will be sent to the customer',

   [InputFieldNames.REPAYMENT_CHANNEL]: 'Select the channel through which loan repayments will be made',
   [InputFieldNames.REPAYMENT_ACCOUNT]: 'Specify where direct debit for repayment will be taken from',
};
