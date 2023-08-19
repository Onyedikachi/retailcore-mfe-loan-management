/* eslint-disable max-len */

import * as Yup from 'yup';

export const InputFieldNames = {
   CHARGE_TYPE: 'charge_type',
   CHARGE: 'charge',
   APPLY: 'apply',
   INITIATE_CHARGE_DEDUCTION: 'initiate_charge_deduction',
   INITIATE_CHARGE_AFTER: 'initiate_charge_after',
   DEDUCTION_PATTERN: 'deduction_pattern',
   PERIOD: 'period',
   PERIOD_NUM: 'period_num',
   POSTING_FREQUENCY: 'posting_frequency',
} as const;

export const accordionLabels = ['Charge Value', 'Tax and Accounting Ledgers', 'Conditions'];
export const chargeTypeOptions = [
   { label: 'Fixed charge', value: 'fixed' },
   { label: 'Compare charges', value: 'compare' },
];
export const deductionPatternOptions = ['Instantly', 'Spread out over a period', 'Accrue for a period'];
export const initialValues = {
   [InputFieldNames.CHARGE_TYPE]: '',
   [InputFieldNames.CHARGE]: '',
   [InputFieldNames.APPLY]: '',
   [InputFieldNames.INITIATE_CHARGE_DEDUCTION]: true,
   [InputFieldNames.INITIATE_CHARGE_AFTER]: '',
   [InputFieldNames.DEDUCTION_PATTERN]: '',
   [InputFieldNames.PERIOD]: '',
   [InputFieldNames.PERIOD_NUM]: 0,
   [InputFieldNames.POSTING_FREQUENCY]: '',
};

export const validator = () =>
   Yup.object({
      [InputFieldNames.CHARGE_TYPE]: Yup.string().required('Select charge type'),
      [InputFieldNames.CHARGE]: Yup.string().when(InputFieldNames.CHARGE_TYPE, (chargeType, field) =>
         chargeType?.[0] ? field.required('Enter charge') : field
      ),
      [InputFieldNames.APPLY]: Yup.string().when(InputFieldNames.CHARGE_TYPE, (chargeType, field) =>
         chargeType?.[0] == chargeTypeOptions[1].value ? field.required('Field is required') : field
      ),
      [InputFieldNames.INITIATE_CHARGE_DEDUCTION]: Yup.boolean(),
      [InputFieldNames.INITIATE_CHARGE_AFTER]: Yup.string().when(
         InputFieldNames.INITIATE_CHARGE_DEDUCTION,
         (initiateDeduction, field) =>
            !initiateDeduction?.[0]
               ? field
                    .required('Field is required')
                    .test(
                       InputFieldNames.INITIATE_CHARGE_AFTER,
                       'Must be greater 0',
                       (value) => Number(value) > 0
                    )
               : field
      ),
      [InputFieldNames.DEDUCTION_PATTERN]: Yup.string().when(
         InputFieldNames.INITIATE_CHARGE_DEDUCTION,
         (initiateDeduction, field) =>
            !initiateDeduction?.[0] ? field.required('Select deduction pattern') : field
      ),
      [InputFieldNames.PERIOD]: Yup.string().when(
         InputFieldNames.DEDUCTION_PATTERN,
         (deductionPattern, field) =>
            deductionPattern?.[0] != deductionPatternOptions[0] ? field.required('Field is required') : field
      ),
      [InputFieldNames.PERIOD_NUM]: Yup.string().when(
         InputFieldNames.DEDUCTION_PATTERN,
         (deductionPattern, field) =>
            deductionPattern?.[0] != deductionPatternOptions[0]
               ? field
                    .required('Field is required')
                    .test(InputFieldNames.PERIOD_NUM, 'Must be greater 0', (value) => Number(value) > 0)
               : field
      ),
      [InputFieldNames.POSTING_FREQUENCY]: Yup.string().when(
         InputFieldNames.DEDUCTION_PATTERN,
         (deductionPattern, field) =>
            deductionPattern?.[0] != deductionPatternOptions[0]
               ? field.required('Select posting pattern')
               : field
      ),
   });

export const TooltipText = {};
