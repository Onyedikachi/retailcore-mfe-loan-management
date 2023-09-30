/* eslint-disable max-len */

import * as Yup from 'yup';

export const InputFieldNames = {
   PRODUCT_NAME: 'product_name',
   PRODUCT_CATEGORY: 'product_category',
   LOAN_PURPOSE: 'loan_purpose',
   PRINCIPAL: 'principal',
   INTEREST_RATE: 'interest_rate',
   LOAN_TENURE_NUM: 'loan_tenure_num',
   LOAN_TENURE_PERIOD: 'loan_tenure',
   REPAYMENT_PATTERN: 'repayment_pattern',
   REPAYMENT_FREQUENCY: 'repayment_frequency',
   REQUIRE_COLLATERAL: 'require_collateral',
   COLLATERAL_AND_EQUITY_VALUES: 'contrib_values',
   COLLATERAL_MARKET_VALUE: 'collateral_market_value',
   COLLATERAL_FILE_UPLOADED: 'collateral_files',
   REQUIRE_EQUITY_CONTRIB: 'require_equity_contrib',
   EQUITY_CONTRIB: 'equity_contrib',
   ENABLE_MORATORIUM_PERIOD: 'enable_moratorium_period',
   MORATORIUM_PERIOD: 'moratorium_period',
   MORATORIUM_PERIOD_VALUE: 'moratorium_period_value',
   RECOGNISE_MORATORIUM_PERIOD: 'recognize_moratorium_period',
   ENABLE_GRACE_PERIOD: 'enable_grace_period',
   GRACE_PERIOD: 'grace_period',
   GRACE_PERIOD_VALUE: 'grace_period_value',
} as const;

export const accordionLabels = [
   'Facility Details',
   'Collateral & Equity Contribution',
   'Loan Management Settings',
];
export const recognize_moratorium_period = ['Included in loan tenor', 'Not included in loan tenor'];
export const initialValues = () => ({
   [InputFieldNames.PRODUCT_NAME]: '',
   [InputFieldNames.PRODUCT_CATEGORY]: '',
   [InputFieldNames.LOAN_PURPOSE]: '',
   [InputFieldNames.PRINCIPAL]: '',
   [InputFieldNames.INTEREST_RATE]: '',
   [InputFieldNames.LOAN_TENURE_NUM]: '',
   [InputFieldNames.LOAN_TENURE_PERIOD]: '',
   [InputFieldNames.REPAYMENT_PATTERN]: '',
   [InputFieldNames.REPAYMENT_FREQUENCY]: '',
   [InputFieldNames.REQUIRE_COLLATERAL]: false,
   [InputFieldNames.COLLATERAL_AND_EQUITY_VALUES]: [],
   [InputFieldNames.COLLATERAL_MARKET_VALUE]: '',
   [InputFieldNames.COLLATERAL_FILE_UPLOADED]: [],
   [InputFieldNames.REQUIRE_EQUITY_CONTRIB]: false,
   [InputFieldNames.EQUITY_CONTRIB]: '',
   [InputFieldNames.ENABLE_MORATORIUM_PERIOD]: false,
   [InputFieldNames.MORATORIUM_PERIOD]: '',
   [InputFieldNames.MORATORIUM_PERIOD_VALUE]: '',
   [InputFieldNames.RECOGNISE_MORATORIUM_PERIOD]: '',
   [InputFieldNames.ENABLE_GRACE_PERIOD]: false,
   [InputFieldNames.GRACE_PERIOD]: '',
   [InputFieldNames.GRACE_PERIOD_VALUE]: '',
});

export const validator = () =>
   Yup.object({
      ...facilityDetails,
      ...colateralAndEquityContrib,
      ...loanManagementSettings,
   });

const facilityDetails = {
   [InputFieldNames.PRODUCT_NAME]: Yup.string().required('Enter loan product name'),
   [InputFieldNames.PRODUCT_CATEGORY]: Yup.string().required('Select a loan product category'),
   [InputFieldNames.LOAN_PURPOSE]: Yup.string().required('Enter purpose of loan request'),
   [InputFieldNames.PRINCIPAL]: Yup.string()
      .required('Enter amount')
      .test(InputFieldNames.PRINCIPAL, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value.replace(/,/g, '')) > 0;
         }
      }),
   [InputFieldNames.INTEREST_RATE]: Yup.string().required('Enter interest rate'),
   [InputFieldNames.LOAN_TENURE_NUM]: Yup.string().required('Field is required'),
   [InputFieldNames.LOAN_TENURE_PERIOD]: Yup.string().required('Field is required'),
   [InputFieldNames.REPAYMENT_PATTERN]: Yup.string().required('Select repayment pattern'),
   [InputFieldNames.REPAYMENT_FREQUENCY]: Yup.string().required('Select repayment frequency'),
};

const colateralAndEquityContrib = {
   [InputFieldNames.REQUIRE_COLLATERAL]: Yup.boolean(),
   [InputFieldNames.COLLATERAL_AND_EQUITY_VALUES]: Yup.array().when(
      InputFieldNames.REQUIRE_COLLATERAL,
      (requireCollateral, field) => {
         return requireCollateral?.[0]
            ? field
                 .of(
                    Yup.object().shape({
                       [InputFieldNames.COLLATERAL_MARKET_VALUE]: Yup.string().required(
                          'Enter market value for this collateral'
                       ),
                       [InputFieldNames.COLLATERAL_FILE_UPLOADED]: Yup.array().required(
                          'Attach supporting documents'
                       ),
                    })
                 )
                 .required('Add at least one collateral asset.')
            : field;
      }
   ),
   [InputFieldNames.REQUIRE_EQUITY_CONTRIB]: Yup.boolean(),
   [InputFieldNames.EQUITY_CONTRIB]: Yup.string().when(
      InputFieldNames.REQUIRE_EQUITY_CONTRIB,
      (requireCollateral, field) => (requireCollateral?.[0] ? field.required('Field is required') : field)
   ),
};
export const loanManagementSettings = {
   [InputFieldNames.ENABLE_MORATORIUM_PERIOD]: Yup.boolean(),
   [InputFieldNames.MORATORIUM_PERIOD_VALUE]: Yup.string().when(
      InputFieldNames.ENABLE_MORATORIUM_PERIOD,
      (enableMoratorium, field) => (enableMoratorium?.[0] ? field.required('Field is required') : field)
   ),
   [InputFieldNames.MORATORIUM_PERIOD]: Yup.string().when(
      InputFieldNames.ENABLE_MORATORIUM_PERIOD,
      (enableMoratorium, field) => (enableMoratorium?.[0] ? field.required('Field is required') : field)
   ),
   [InputFieldNames.RECOGNISE_MORATORIUM_PERIOD]: Yup.string().when(
      InputFieldNames.ENABLE_MORATORIUM_PERIOD,
      (enableMoratorium, field) => (enableMoratorium?.[0] ? field.required('Field is required') : field)
   ),
   [InputFieldNames.ENABLE_GRACE_PERIOD]: Yup.boolean(),
   [InputFieldNames.GRACE_PERIOD_VALUE]: Yup.string().when(
      InputFieldNames.ENABLE_GRACE_PERIOD,
      (enableGracePeriod, field) => (enableGracePeriod?.[0] ? field.required('Field is required') : field)
   ),
   [InputFieldNames.GRACE_PERIOD]: Yup.string().when(
      InputFieldNames.ENABLE_GRACE_PERIOD,
      (enableGracePeriod, field) => (enableGracePeriod?.[0] ? field.required('Field is required') : field)
   ),
};

export const TooltipText = {
   [InputFieldNames.PRODUCT_NAME]: 'Enter the name of the loan product customer wants to take.',
   [InputFieldNames.PRODUCT_CATEGORY]: 'Select a product category for the loan product being booked',
   [InputFieldNames.LOAN_PURPOSE]: 'Enter the purpose for which customer wants to take  this loan product',
   [InputFieldNames.PRINCIPAL]: 'Enter amount customer wants to take under this loan product',
   [InputFieldNames.INTEREST_RATE]:
      'Specify the percentage at which interest will be charged on the loan amount',
   [InputFieldNames.LOAN_TENURE_PERIOD]:
      'Specify the period for which the customer will hold this loan product ',
   [InputFieldNames.REPAYMENT_PATTERN]:
      'Select the frequency at which the equated  instalment (EI) will be paid',
   [InputFieldNames.REPAYMENT_FREQUENCY]:
      'Select the frequency at which the equated  instalment (EI) will be paid',
   [InputFieldNames.COLLATERAL_MARKET_VALUE]: 'Enter the appraised value of the collateral selected',
   [InputFieldNames.ENABLE_MORATORIUM_PERIOD]:
      'This is the period during which the customer is not required to make loan repayments',
   [InputFieldNames.MORATORIUM_PERIOD]: 'Specify the moratorium period',
   [InputFieldNames.RECOGNISE_MORATORIUM_PERIOD]:
      'Will the moratorium period be included in the loan tenor or not?',
   [InputFieldNames.ENABLE_GRACE_PERIOD]:
      'This is a defined period that kicks in after failure to meet a repayment obligation during which the customer’s loan is still considered to be in good standing',
   [InputFieldNames.GRACE_PERIOD]: 'Specify the period of grace period',
};

export const repaymentPattern = [
   'Equal Installment (Reducing Balance)',
   'Equal Installment (Fixed)',
   'Bullet',
];
