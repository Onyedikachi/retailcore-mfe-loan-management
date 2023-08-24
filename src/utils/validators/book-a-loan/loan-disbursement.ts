/* eslint-disable max-len */

import * as Yup from 'yup';

export const InputFieldNames = {
   DISBURSEMENT_METHOD: 'disbursement_method',
   DISBURSEMENT_ACCOUNT: 'disbursement_account',
   DISBURSEMENT_DATE: 'disbursement_date',
   OTHER_ACCOUNT_NO: 'other_account_no',
   ENABLE_DISBURSEMENT_NOTIFICATION: 'enable_disbursement_notification',
   NOTIFICATION_CHANNEL: 'notification_channel',
   DISBURSEMENT_DEBIT_LEDGER: 'disbursement_debit_ledger',
   DISBURSEMENT_CREDIT_LEDGER: 'disbursement_credit_ledger',
   PRINCIPAL_REPAYMENT_DEBIT_LEDGER: 'principal_repayment_debit_ledger',
   PRINCIPAL_REPAYMENT_CREDIT_LEDGER: 'principal_repayment_credit_ledger',
   INTEREST_REPAYMENT_DEBIT_LEDGER: 'interest_repayement_debit_ledger',
   INTEREST_REPAYMENT_CREDIT_LEDGER: 'interest_repayement_credit_ledger',
   INTEREST_ACCRUED_DEBIT_LEDGER: 'interest_accrued_debit_ledger',
   INTEREST_ACCRUED_CREDIT_LEDGER: 'interest_accrued_credit_ledger',
   PENALTIES_DEBIT_LEDGER: 'penalties_debit_ledger',
   PENALTIES_CREDIT_LEDGER: 'penalties_credit_ledger',
} as const;

export const accordionLabels = ['Disbursement Settings', 'Accounting Entries'];

export const disbursementMethods = ['On Approval', 'Schedule Disbursement Date'];
export const disbursementAccounts = ['Customer’s Account', 'Suspense Account', 'Other Customers’ Account'];

export const initialValues = {
   [InputFieldNames.DISBURSEMENT_METHOD]: '',
   [InputFieldNames.DISBURSEMENT_ACCOUNT]: '',
   [InputFieldNames.DISBURSEMENT_DATE]: '',
   [InputFieldNames.OTHER_ACCOUNT_NO]: '',
   [InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION]: false,
   [InputFieldNames.NOTIFICATION_CHANNEL]: [],
   [InputFieldNames.DISBURSEMENT_DEBIT_LEDGER]: [],
   [InputFieldNames.DISBURSEMENT_CREDIT_LEDGER]: [],
   [InputFieldNames.PRINCIPAL_REPAYMENT_DEBIT_LEDGER]: [],
   [InputFieldNames.PRINCIPAL_REPAYMENT_CREDIT_LEDGER]: [],
   [InputFieldNames.INTEREST_REPAYMENT_DEBIT_LEDGER]: [],
   [InputFieldNames.INTEREST_REPAYMENT_CREDIT_LEDGER]: [],
   [InputFieldNames.INTEREST_ACCRUED_DEBIT_LEDGER]: [],
   [InputFieldNames.INTEREST_ACCRUED_CREDIT_LEDGER]: [],
   [InputFieldNames.PENALTIES_DEBIT_LEDGER]: [],
   [InputFieldNames.PENALTIES_CREDIT_LEDGER]: [],
};

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
            enableNotification?.[0] ? field.min(1, 'Select one notification channel') : field
      ),
      [InputFieldNames.DISBURSEMENT_DEBIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.DISBURSEMENT_CREDIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.PRINCIPAL_REPAYMENT_DEBIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.PRINCIPAL_REPAYMENT_CREDIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.INTEREST_REPAYMENT_DEBIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.INTEREST_REPAYMENT_CREDIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.INTEREST_ACCRUED_DEBIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.INTEREST_ACCRUED_CREDIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.PENALTIES_DEBIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
      [InputFieldNames.PENALTIES_CREDIT_LEDGER]: Yup.array().min(1, 'Select at least one '),
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
   [InputFieldNames.DISBURSEMENT_DEBIT_LEDGER]:
      'Specify the debit and credit ledgers to be reported to on disbursement of the principal',
   [InputFieldNames.PRINCIPAL_REPAYMENT_DEBIT_LEDGER]:
      'Specify the debit and credit ledgers to be reported to for the repayment of the principal component of the loan',
   [InputFieldNames.INTEREST_REPAYMENT_DEBIT_LEDGER]:
      'Specify the debit and credit ledgers to be reported to for the repayment of the interest component of the loan',
   [InputFieldNames.INTEREST_ACCRUED_DEBIT_LEDGER]:
      'Specify the debit and credit ledgers to be reported to for interest accrual',
   [InputFieldNames.PENALTIES_DEBIT_LEDGER]:
      'Specify the debit and credit ledgers to be reported to for penalties fees',
};
