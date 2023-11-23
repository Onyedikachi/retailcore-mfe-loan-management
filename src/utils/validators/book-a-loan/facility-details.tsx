/* eslint-disable max-len */
import { LoanProductData } from '@app/@types/loan-product';
import { eligibilityCriteria, findInterestRates } from '@app/constants/book-loan';
import { TenureMapping, TenureMappingKey } from '@app/constants/forms';
import { currencyToNumber } from '@app/helper/currency-helper';
import * as Yup from 'yup';

export const InputFieldNames = {
   PRODUCT_NAME: 'product_name',
   PRODUCT_CATEGORY: 'product_category',
   LOAN_PURPOSE: 'productPurpose',
   PRINCIPAL: 'principal',
   INTEREST_RATE: 'interestRate',
   LOAN_TENURE_NUM: 'tenorValue',
   LOAN_TENURE_PERIOD: 'tenorPeriod',
   REPAYMENT_PATTERN: 'repayment_pattern',
   REPAYMENT_FREQUENCY: 'repayment_frequency',
   START_DATE: 'start_date',
   START_DATE_NUM: 'start_date_num',
   START_DATE_PERIOD: 'start_date_period',
   COLLATERALS: 'collaterals',
   EQUITY_CONTRIB: 'equity_contrib',
   ENABLE_MORATORIUM_PERIOD: 'isMoratoriumReq',
   MORATORIUM_PERIOD: 'moratoriumPeriod',
   MORATORIUM_PERIOD_VALUE: 'moratoriumValue',
   RECOGNISE_MORATORIUM_PERIOD: 'recognize_moratorium_period',
   ENABLE_GRACE_PERIOD: 'isGraceReq',
   GRACE_PERIOD: 'gracePeriod',
   GRACE_PERIOD_VALUE: 'graceValue',
} as const;

export const CollateralFieldNames = {
   COLLATERAL_MARKET_VALUE: 'collateral_market_value',
   COLLATERAL_FILE_UPLOADED: 'collateral_file',
} as const;

type CollateralFields = typeof CollateralFieldNames & { id: string };

export type FacilityDetailsFormValues = {
   [key in (typeof InputFieldNames)[keyof typeof InputFieldNames]]: key extends
      | 'isMoratoriumReq'
      | 'isGraceReq'
      ? boolean
      : key extends 'collaterals'
      ? CollateralFields[]
      : string;
};

export const accordionLabels = [
   'Facility Details',
   'Collateral & Equity Contribution',
   'Loan Management Settings',
];
export const recognize_moratorium_period = ['Included in loan tenor', 'Not included in loan tenor'];

export const initialValues = (data?: FacilityDetailsFormValues) => ({
   [InputFieldNames.PRODUCT_NAME]: data?.[InputFieldNames.PRODUCT_NAME] ?? '',
   [InputFieldNames.PRODUCT_CATEGORY]: data?.[InputFieldNames.PRODUCT_CATEGORY] ?? '',
   [InputFieldNames.LOAN_PURPOSE]: data?.[InputFieldNames.LOAN_PURPOSE] ?? '',
   [InputFieldNames.PRINCIPAL]: data?.[InputFieldNames.PRINCIPAL] ?? '',
   [InputFieldNames.INTEREST_RATE]: data?.[InputFieldNames.INTEREST_RATE] ?? '',
   [InputFieldNames.LOAN_TENURE_NUM]: data?.[InputFieldNames.LOAN_TENURE_NUM] ?? '',
   [InputFieldNames.LOAN_TENURE_PERIOD]: data?.[InputFieldNames.LOAN_TENURE_PERIOD] ?? '',
   [InputFieldNames.REPAYMENT_PATTERN]: data?.[InputFieldNames.REPAYMENT_PATTERN] ?? '',
   [InputFieldNames.REPAYMENT_FREQUENCY]: data?.[InputFieldNames.REPAYMENT_FREQUENCY] ?? '',
   [InputFieldNames.START_DATE]: data?.[InputFieldNames.START_DATE] ?? '',
   [InputFieldNames.START_DATE_NUM]: data?.[InputFieldNames.START_DATE_NUM] ?? '',
   [InputFieldNames.START_DATE_PERIOD]: data?.[InputFieldNames.START_DATE_PERIOD] ?? '',
   [InputFieldNames.COLLATERALS]: data?.[InputFieldNames.COLLATERALS] ?? [],
   [InputFieldNames.EQUITY_CONTRIB]: data?.[InputFieldNames.EQUITY_CONTRIB] ?? '',
   ...otherInitialValues(data),
});
const otherInitialValues = (data?: FacilityDetailsFormValues) => ({
   [InputFieldNames.ENABLE_MORATORIUM_PERIOD]: data?.[InputFieldNames.ENABLE_MORATORIUM_PERIOD] ?? false,
   [InputFieldNames.MORATORIUM_PERIOD]: data?.[InputFieldNames.MORATORIUM_PERIOD] ?? '',
   [InputFieldNames.MORATORIUM_PERIOD_VALUE]: data?.[InputFieldNames.MORATORIUM_PERIOD_VALUE] ?? '',
   [InputFieldNames.RECOGNISE_MORATORIUM_PERIOD]: data?.[InputFieldNames.RECOGNISE_MORATORIUM_PERIOD] ?? '',
   [InputFieldNames.ENABLE_GRACE_PERIOD]: data?.[InputFieldNames.ENABLE_GRACE_PERIOD] ?? false,
   [InputFieldNames.GRACE_PERIOD]: data?.[InputFieldNames.GRACE_PERIOD] ?? '',
   [InputFieldNames.GRACE_PERIOD_VALUE]: data?.[InputFieldNames.GRACE_PERIOD_VALUE] ?? '',
});

export const validator = (selectedProduct?: LoanProductData) =>
   Yup.object({
      ...facilityDetails(selectedProduct),
      ...colateralAndEquityContrib(selectedProduct),
      ...loanManagementSettings(selectedProduct),
   });

const facilityDetails = (selectedProduct?: LoanProductData) => {
   return {
      [InputFieldNames.PRODUCT_NAME]: Yup.string().required('Enter loan product name'),
      [InputFieldNames.LOAN_PURPOSE]: Yup.string().required('Enter purpose of loan request'),
      [InputFieldNames.PRINCIPAL]: Yup.string()
         .required('Enter amount')
         .test(
            InputFieldNames.PRINCIPAL,
            'Must not be lesser than the min. principal of the selected product',
            function (value) {
               if (value && selectedProduct) {
                  return currencyToNumber(value) >= selectedProduct?.minLoanPrincipal;
               }
            }
         )
         .test(
            InputFieldNames.PRINCIPAL,
            'Must not be greater than the max. principal of the selected product',
            function (value) {
               if (value && selectedProduct) {
                  return currencyToNumber(value) <= selectedProduct.maxLoanPrincipal;
               }
            }
         ),
      [InputFieldNames.INTEREST_RATE]: Yup.string()
         .required('Enter interest rate')
         .test(
            InputFieldNames.INTEREST_RATE,
            'Must not be lesser than the min. interest rate of the selected product',
            function (value) {
               if (value && selectedProduct) {
                  const { minInterestRate } = findInterestRates(
                     selectedProduct,
                     currencyToNumber(this.parent?.[InputFieldNames.PRINCIPAL] ?? '')
                  );

                  return Number(value) >= minInterestRate;
               }
            }
         )
         .test(
            InputFieldNames.INTEREST_RATE,
            'Must not be greater than the max. interest rate of the selected product',
            function (value) {
               if (value && selectedProduct) {
                  const { maxInterestRate } = findInterestRates(
                     selectedProduct,
                     currencyToNumber(this.parent?.[InputFieldNames.PRINCIPAL] ?? '')
                  );
                  return Number(value) <= maxInterestRate;
               }
            }
         ),
      [InputFieldNames.LOAN_TENURE_NUM]: Yup.string().required('Field is required'),
      [InputFieldNames.LOAN_TENURE_PERIOD]: Yup.string()
         .required('Field is required')
         .test(
            InputFieldNames.LOAN_TENURE_PERIOD,
            'Must not be lesser than the min. loan tenor of the selected product',
            function (value) {
               if (value && selectedProduct) {
                  const min =
                     selectedProduct?.minLoanTenure *
                     TenureMapping[selectedProduct?.minLoanTenurePeriod as TenureMappingKey];
                  const tenor =
                     Number(this.parent?.[InputFieldNames.LOAN_TENURE_NUM]) *
                     TenureMapping[value as TenureMappingKey];

                  return tenor >= min;
               }
            }
         )
         .test(
            InputFieldNames.LOAN_TENURE_PERIOD,
            'Must not be greater than the max. loan tenor of the selected product',
            function (value) {
               if (value && selectedProduct) {
                  const max =
                     selectedProduct?.maxLoanTenure *
                     TenureMapping[selectedProduct?.maxLoanTenurePeriod as TenureMappingKey];
                  const tenor =
                     Number(this.parent?.[InputFieldNames.LOAN_TENURE_NUM]) *
                     TenureMapping[value as TenureMappingKey];

                  return tenor <= max;
               }
            }
         ),
      [InputFieldNames.REPAYMENT_PATTERN]: Yup.string().required('Select repayment pattern'),
      [InputFieldNames.REPAYMENT_FREQUENCY]: Yup.string().required('Select repayment frequency'),
      [InputFieldNames.START_DATE]: Yup.string().when(
         InputFieldNames.REPAYMENT_FREQUENCY,
         (repaymentFrequency, field) =>
            repaymentFrequency?.[0] == 'Custom' ? field.required('Field is required') : field
      ),
      [InputFieldNames.START_DATE_NUM]: Yup.string().when(
         InputFieldNames.REPAYMENT_FREQUENCY,
         (repaymentFrequency, field) =>
            repaymentFrequency?.[0] == 'Custom'
               ? field
                    .required('Field is required')
                    .test(InputFieldNames.START_DATE_NUM, 'Must be greater than 0', function (value) {
                       if (value) {
                          return Number(value) > 0;
                       }
                    })
               : field
      ),
      [InputFieldNames.START_DATE_PERIOD]: Yup.string().when(
         InputFieldNames.REPAYMENT_FREQUENCY,
         (repaymentFrequency, field) =>
            repaymentFrequency?.[0] == 'Custom' ? field.required('Field is required') : field
      ),
   };
};

const colateralAndEquityContrib = (selectedProduct?: LoanProductData) => {
   const eligibility = eligibilityCriteria(selectedProduct);
   return {
      [InputFieldNames.COLLATERALS]: Yup.array().of(
         Yup.object().shape({
            [CollateralFieldNames.COLLATERAL_MARKET_VALUE]: Yup.string()
               .required('Enter market value for this collateral')
               .test(
                  CollateralFieldNames.COLLATERAL_MARKET_VALUE,
                  'Must be greater than 0',
                  function (value) {
                     if (value) {
                        return currencyToNumber(value) > 0;
                     }
                  }
               ),
            [CollateralFieldNames.COLLATERAL_FILE_UPLOADED]: Yup.mixed(),
            //    .required(
            //    'Attach supporting document(s)'
            // ),
         })
      ),
      // .required('Add at least one collateral asset.'),
      [InputFieldNames.EQUITY_CONTRIB]: Yup.string()
         .test(InputFieldNames.EQUITY_CONTRIB, 'Field is required', function (value) {
            return eligibility?.requireEquityContrib ? !!Number(value) : true;
         })
         .test(
            InputFieldNames.EQUITY_CONTRIB,
            `Should be equal to ${eligibility?.contributionValueFrom}%, as configured for the selected product`,
            function (value) {
               if (value && eligibility?.equityContribType.includes('ixed')) {
                  return Number(value) === eligibility?.contributionValueFrom;
               }
               return true;
            }
         )
         .test(
            InputFieldNames.EQUITY_CONTRIB,
            `Should not be lesser than ${eligibility?.contributionValueFrom}%, as configured for the selected product`,
            function (value) {
               if (value && eligibility?.equityContribType.includes('ange')) {
                  return Number(value) >= eligibility?.contributionValueFrom;
               }
               return true;
            }
         )
         .test(
            InputFieldNames.EQUITY_CONTRIB,
            `Should not be greater than ${eligibility?.contributionValueTo}%, as configured for the selected product`,
            function (value) {
               if (value && eligibility?.equityContribType.includes('ange')) {
                  return Number(value) <= eligibility?.contributionValueTo;
               }
               return true;
            }
         ),
   };
};
export const loanManagementSettings = (selectedProduct?: LoanProductData) => {
   return {
      [InputFieldNames.ENABLE_MORATORIUM_PERIOD]: Yup.boolean(),
      [InputFieldNames.MORATORIUM_PERIOD_VALUE]: Yup.string().when(
         InputFieldNames.ENABLE_MORATORIUM_PERIOD,
         (enableMoratorium, field) => (enableMoratorium?.[0] ? field.required('Field is required') : field)
      ),
      [InputFieldNames.MORATORIUM_PERIOD]: Yup.string().when(
         InputFieldNames.ENABLE_MORATORIUM_PERIOD,
         (enableMoratorium, field) =>
            enableMoratorium?.[0]
               ? field
                    .required('Field is required')
                    .test(
                       InputFieldNames.MORATORIUM_PERIOD,
                       'Must not be greater than the max. loan tenor of the selected product',
                       function (value) {
                          if (value && selectedProduct) {
                             const max =
                                selectedProduct?.maxLoanTenure *
                                TenureMapping[selectedProduct?.maxLoanTenurePeriod as TenureMappingKey];
                             const moratorium =
                                Number(this.parent?.[InputFieldNames.LOAN_TENURE_NUM]) *
                                TenureMapping[value as TenureMappingKey];

                             return moratorium <= max;
                          }
                       }
                    )
               : field
      ),
      [InputFieldNames.RECOGNISE_MORATORIUM_PERIOD]: Yup.string().when(
         InputFieldNames.ENABLE_MORATORIUM_PERIOD,
         (enableMoratorium, field) => (enableMoratorium?.[0] ? field.required('Field is required') : field)
      ),
      [InputFieldNames.ENABLE_GRACE_PERIOD]: Yup.boolean(),
      [InputFieldNames.GRACE_PERIOD_VALUE]: Yup.string().when(
         InputFieldNames.ENABLE_GRACE_PERIOD,
         (enableGracePeriod, field) =>
            enableGracePeriod?.[0]
               ? field
                    .required('Field is required')
                    .test(InputFieldNames.GRACE_PERIOD_VALUE, 'Must be greater than 0', function (value) {
                       if (value) {
                          return Number(value) > 0;
                       }
                    })
               : field
      ),
      [InputFieldNames.GRACE_PERIOD]: Yup.string().when(
         InputFieldNames.ENABLE_GRACE_PERIOD,
         (enableGracePeriod, field) => (enableGracePeriod?.[0] ? field.required('Field is required') : field)
      ),
   };
};

export const TooltipText = {
   [InputFieldNames.PRODUCT_NAME]: 'Select the loan product the customer wants to take.',
   [InputFieldNames.PRODUCT_CATEGORY]:
      'This represents the product category for the loan product being booked',
   [InputFieldNames.LOAN_PURPOSE]: 'Indicate the purpose for which customer wants to take  this loan product',
   [InputFieldNames.PRINCIPAL]: 'Specify the pricipal (amount) that the customer wishes to collect as a loan',
   [InputFieldNames.INTEREST_RATE]:
      'Specify the rate (%) at which interest will be charged on the loan amount',
   [InputFieldNames.LOAN_TENURE_PERIOD]:
      'Specify the period for which the customer will hold this loan product',
   [InputFieldNames.REPAYMENT_PATTERN]:
      'Select the method/pattern with which the customer is to pay back the loan amount',
   [InputFieldNames.REPAYMENT_FREQUENCY]:
      'Select the frequency at which the equated  instalment (EI) will be paid',
   [InputFieldNames.START_DATE]: 'Specify start date',
   [CollateralFieldNames.COLLATERAL_MARKET_VALUE]: 'Enter the appraised value of the collateral selected',
   [InputFieldNames.ENABLE_MORATORIUM_PERIOD]:
      'This is the period during which the customer is not required to make loan repayments',
   [InputFieldNames.MORATORIUM_PERIOD]:
      'Specify the period during which the borrower is not required to make loan repayments',
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
   'Tranches',
];
