/* eslint-disable max-len */

import * as Yup from 'yup';

export const InputFieldNames = {
   CHARGES_AND_TAXES: 'charges_and_taxes',
   CHARGES: 'charges',
   TAXES: 'taxes',
   CONFIGURE_PENALTY: 'configure_penalty',
   LATE_PAYMENT_PENALTY: 'late_payment',
   PENALTY_INTEREST_RATE: 'penalty_interest_rate',
} as const;

export const accordionLabels = ['Charges & Taxes', 'Penalty Setup'];

export const latePaymentPenaltyOptions = [
   'Additional Interest',
   'Post no debit',
   'Place account in overdraft',
];
export const initialValues = () => ({
   [InputFieldNames.CHARGES_AND_TAXES]: [],
   [InputFieldNames.CONFIGURE_PENALTY]: false,
   [InputFieldNames.LATE_PAYMENT_PENALTY]: '',
   [InputFieldNames.PENALTY_INTEREST_RATE]: '',
});

export const validator = () =>
   Yup.object({
      [InputFieldNames.CHARGES_AND_TAXES]: Yup.array()
         .required('Add charges and taxes')
         .of(
            Yup.object().shape({
               [InputFieldNames.CHARGES]: Yup.array().required('Select charges'),
               [InputFieldNames.TAXES]: Yup.array().required('Select taxes'),
            })
         ),
      [InputFieldNames.CONFIGURE_PENALTY]: Yup.boolean(),
      [InputFieldNames.LATE_PAYMENT_PENALTY]: Yup.string().when(
         InputFieldNames.CONFIGURE_PENALTY,
         (configurePenalty, field) => (configurePenalty?.[0] ? field.required('Select a penalty') : field)
      ),
      [InputFieldNames.PENALTY_INTEREST_RATE]: Yup.string().when(
         InputFieldNames.LATE_PAYMENT_PENALTY,
         (latePaymentPenalty, field) =>
            latePaymentPenalty?.[0] === latePaymentPenaltyOptions[0]
               ? field.required('Enter additional interest rate')
               : field
      ),
   });

export const TooltipText = {
   [InputFieldNames.LATE_PAYMENT_PENALTY]:
      'Select a breach penalty for when a borrower fails to make payment on a due date',
   [InputFieldNames.PENALTY_INTEREST_RATE]:
      'Specify the additional interest rate that will be added to the already defined loan interest rate',
};
