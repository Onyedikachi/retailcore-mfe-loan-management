import { EligibilitySecurity } from '@app/constants/eligibility-security';
import * as Yup from 'yup';

export const InputFieldNames = {
   SET_EARNINGS: 'require_earning',
   EARNINGS_TYPE: 'earn_type',
   EARNINGS_VALUE: 'earn_value',
   EARNINGS_PERIOD_VALUE: 'earn_period_value',
   EARNINGS_PERIOD: 'earn_period',
   SET_EQUITY: 'require_contrib',
   EQUITY_TYPE: 'equity_contrib_type',
   EQUITY_VALUE_FROM: 'contrib_value_from',
   EQUITY_VALUE_TO: 'contrib_value_to',
   SET_SECURITY: 'require_security',
   SECURITY_OPTION: 'security_options',
   SECURITY_OTHER_VALUES: EligibilitySecurity.other.formFieldName,
   SECURITY_GUARANTOR_VALUES: EligibilitySecurity.guarantor.formFieldName,
   SECURITY_COLLATERAL_VALUES: EligibilitySecurity.collateral.formFieldName,
   SET_OTHER_REQUIREMENT: 'require_other_elig_criteria',
} as const;

export const accordionLabels = [
   'Earnings/Turnover',
   'Equity Contribution',
   'Securities',
   'Other Eligibility Requirements',
];
export const securityOptions = [
   EligibilitySecurity.guarantor.optionValue,
   EligibilitySecurity.collateral.optionValue,
   EligibilitySecurity.other.optionValue,
];

export const eligibilityInitialValues = () => ({
   [InputFieldNames.SET_EARNINGS]: false,
   [InputFieldNames.EARNINGS_TYPE]: '',
   [InputFieldNames.EARNINGS_VALUE]: '',
   [InputFieldNames.EARNINGS_PERIOD_VALUE]: '',
   [InputFieldNames.EARNINGS_PERIOD]: '',
   [InputFieldNames.SET_EQUITY]: false,
   [InputFieldNames.EQUITY_TYPE]: '',
   [InputFieldNames.EQUITY_VALUE_FROM]: '',
   [InputFieldNames.EQUITY_VALUE_TO]: '',
   [InputFieldNames.SET_SECURITY]: false,
   [InputFieldNames.SECURITY_OPTION]: [],
   [InputFieldNames.SET_OTHER_REQUIREMENT]: false,
   [InputFieldNames.SECURITY_COLLATERAL_VALUES]: [],
   [InputFieldNames.SECURITY_GUARANTOR_VALUES]: [],
   [InputFieldNames.SECURITY_OTHER_VALUES]: [],
});

export const eligibilityValidator = () =>
   Yup.object({
      ...earningsOrTurnover,
      ...equityContributions,
      ...securities,
      [InputFieldNames.SET_OTHER_REQUIREMENT]: Yup.boolean(),
   });

const earningsOrTurnover = {
   [InputFieldNames.SET_EARNINGS]: Yup.boolean(),
   [InputFieldNames.EARNINGS_TYPE]: Yup.string().when(InputFieldNames.SET_EARNINGS, (setEarnings, field) =>
      setEarnings ? field.required('Select earnings type') : field
   ),
   [InputFieldNames.EARNINGS_VALUE]: Yup.string()
      .when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
         earningType[0] == 'fixed' ? field.required('Enter an amount') : field
      )
      .test(InputFieldNames.EARNINGS_VALUE, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value.replace(/,/g, '')) > 0;
         }
      }),
   [InputFieldNames.EARNINGS_PERIOD_VALUE]: Yup.string()
      .when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
         earningType[0] == 'fixed' ? field.required('Field is required') : field
      )
      .test(InputFieldNames.EARNINGS_PERIOD_VALUE, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      }),
   [InputFieldNames.EARNINGS_PERIOD]: Yup.string().when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
      earningType[0] == 'fixed' ? field.required('Field is required') : field
   ),
};

const equityContributions = {
   [InputFieldNames.SET_EQUITY]: Yup.boolean(),
   [InputFieldNames.EQUITY_TYPE]: Yup.string().when(InputFieldNames.SET_EQUITY, (setEquity, field) =>
      setEquity ? field.required('Select contribution type') : field
   ),
   [InputFieldNames.EQUITY_VALUE_FROM]: Yup.string()
      .when(InputFieldNames.EQUITY_TYPE, (equityContributionType, field) =>
         equityContributionType[0] == 'fixed' ? field.required('Enter a percentage') : field
      )
      .test(InputFieldNames.EQUITY_VALUE_FROM, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      }),
   [InputFieldNames.EQUITY_VALUE_TO]: Yup.string()
      .when(InputFieldNames.EARNINGS_TYPE, (equityContributionType, field) =>
         equityContributionType[0] == 'range' ? field.required('Enter max percentage') : field
      )
      .test(InputFieldNames.EQUITY_VALUE_TO, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      })
      .test(InputFieldNames.EQUITY_VALUE_TO, 'Must be greater than min percentage', function (value) {
         const {
            [InputFieldNames.EQUITY_TYPE]: equityContributionType,
            [InputFieldNames.EQUITY_VALUE_FROM]: rangeEquityPercentStart,
         } = this.parent;

         if (equityContributionType == 'range' && value)
            return Number(value) > Number(rangeEquityPercentStart);
      }),
};
export const securities = {
   [InputFieldNames.SET_SECURITY]: Yup.boolean(),
   [InputFieldNames.SECURITY_OPTION]: Yup.array().when(InputFieldNames.SET_SECURITY, (setSecurity, field) =>
      setSecurity
         ? field.min(1, 'Select at least one security option').of(Yup.string().oneOf(securityOptions))
         : field
   ),
   [InputFieldNames.SECURITY_COLLATERAL_VALUES]: Yup.array().when(
      InputFieldNames.SECURITY_OPTION,
      (securityOptions, field) => {
         return securityOptions.includes(EligibilitySecurity.collateral.optionValue) && !field.length
            ? field.min(1, 'Add At least one security option')
            : field;
      }
   ),
   [InputFieldNames.SECURITY_GUARANTOR_VALUES]: Yup.array().when(
      InputFieldNames.SECURITY_OPTION,
      (securityOptions, field) => {
         return securityOptions.includes(EligibilitySecurity.guarantor.optionValue) && !field.length
            ? field.min(1, 'Add At least one security option')
            : field;
      }
   ),
   [InputFieldNames.SECURITY_OTHER_VALUES]: Yup.array().when(
      InputFieldNames.SECURITY_OPTION,
      (securityOptions, field) => {
         return securityOptions.includes(EligibilitySecurity.other.optionValue) && !field.length
            ? field.min(1, 'Add At least one security option')
            : field;
      }
   ),
};
export const ToolTipText = {
   earnings: 'Specify the average amount of cash that must flow into the borrower’s account over a period',
   equity: 'Specify the equity the user should contribute  to have access to the loan',
   security: 'Enable collateral and other securities for the loan product',
   otherSecurity:
      'Specify other security requirements for this loan product to be satisfied by the customer. ',
};
