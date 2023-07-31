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
   OTHER_REQUIREMENT_VALUES: 'other_eligibility_requirement_ids',

   PERIODICITY_NUM_START: 'period_from',
   PERIODICITY_NUM_END: 'period_to',
   PERIODICITY_PERIOD: 'period',
   SET_FORMAT: 'is_doc_required',
   ADD_FORMAT: 'accepted_format',
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
   [InputFieldNames.OTHER_REQUIREMENT_VALUES]: [],
});

export const eligibilityValidator = () =>
   Yup.object({
      ...earningsOrTurnover,
      ...equityContributions,
      ...securities,
      ...otherEligibiltyCriteria,
   });

const earningsOrTurnover = {
   [InputFieldNames.SET_EARNINGS]: Yup.boolean(),
   [InputFieldNames.EARNINGS_TYPE]: Yup.string().when(InputFieldNames.SET_EARNINGS, (setEarnings, field) => {
      return setEarnings?.[0] ? field.required('Select earnings type') : field;
   }),
   [InputFieldNames.EARNINGS_VALUE]: Yup.string().when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
      earningType[0] == 'fixed'
         ? field
              .required('Field is required')
              .test(InputFieldNames.EARNINGS_VALUE, 'Must be greater 0', function (value) {
                 if (value) {
                    return Number(value.replace(/,/g, '')) > 0;
                 }
              })
         : field
   ),
   [InputFieldNames.EARNINGS_PERIOD_VALUE]: Yup.string().when(
      InputFieldNames.EARNINGS_TYPE,
      (earningType, field) =>
         earningType[0] == 'fixed'
            ? field
                 .required('Field is required')
                 .test(InputFieldNames.EARNINGS_PERIOD_VALUE, 'Must be greater 0', function (value) {
                    if (value) {
                       return Number(value) > 0;
                    }
                 })
            : field
   ),
   [InputFieldNames.EARNINGS_PERIOD]: Yup.string().when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
      earningType[0] == 'fixed' ? field.required('Field is required') : field
   ),
};

const equityContributions = {
   [InputFieldNames.SET_EQUITY]: Yup.boolean(),
   [InputFieldNames.EQUITY_TYPE]: Yup.string().when(InputFieldNames.SET_EQUITY, (setEquity, field) =>
      setEquity?.[0] ? field.required('Select contribution type') : field
   ),
   [InputFieldNames.EQUITY_VALUE_FROM]: Yup.string().when(
      InputFieldNames.EQUITY_TYPE,
      (equityContributionType, field) =>
         ['fixed', 'range'].includes(equityContributionType[0])
            ? field
                 .required('Enter a percentage')
                 .test(InputFieldNames.EQUITY_VALUE_FROM, 'Must be greater 0', function (value) {
                    if (value) return Number(value) > 0;
                 })
            : field
   ),
   [InputFieldNames.EQUITY_VALUE_TO]: Yup.string().when(
      InputFieldNames.EQUITY_TYPE,
      (equityContributionType, field) =>
         equityContributionType[0] == 'range'
            ? field
                 .required('Enter max percentage')
                 .test(InputFieldNames.EQUITY_VALUE_TO, 'Must be greater 0', function (value) {
                    if (value) return Number(value) > 0;
                 })
                 .test(
                    InputFieldNames.EQUITY_VALUE_TO,
                    'Must be greater than min percentage',
                    function (value) {
                       const { [InputFieldNames.EQUITY_VALUE_FROM]: rangeEquityPercentStart } = this.parent;

                       if (value) return Number(value) > Number(rangeEquityPercentStart);
                    }
                 )
            : field
   ),
};
export const securities = {
   [InputFieldNames.SET_SECURITY]: Yup.boolean(),
   [InputFieldNames.SECURITY_OPTION]: Yup.array().when(InputFieldNames.SET_SECURITY, (setSecurity, field) =>
      setSecurity?.[0]
         ? field
              .min(1, 'Select at least one security option')
              .of(Yup.string().oneOf(securityOptions))
              .test(InputFieldNames.SECURITY_OPTION, '', function (value) {
                 const {
                    [InputFieldNames.SECURITY_GUARANTOR_VALUES]: G,
                    [InputFieldNames.SECURITY_COLLATERAL_VALUES]: C,
                    [InputFieldNames.SECURITY_OTHER_VALUES]: O,
                 } = this.parent;
                 if (value?.includes(securityOptions[0])) {
                    return G.length > 0;
                 } else if (value?.includes(securityOptions[1])) {
                    return C.length > 0;
                 } else if (value?.includes(securityOptions[2])) {
                    return O.length > 0;
                 }
              })
         : field
   ),
   [InputFieldNames.SECURITY_COLLATERAL_VALUES]: Yup.array().when(
      InputFieldNames.SECURITY_OPTION,
      (securityOptions, field) => {
         return securityOptions.flat().includes(EligibilitySecurity.collateral.optionValue)
            ? field.min(1, 'Add at least one collateral asset.')
            : field;
      }
   ),
   [InputFieldNames.SECURITY_GUARANTOR_VALUES]: Yup.array().when(
      InputFieldNames.SECURITY_OPTION,
      (securityOptions, field) => {
         return securityOptions.flat().includes(EligibilitySecurity.guarantor.optionValue)
            ? field.min(1, 'Add At least one supporting document.')
            : field;
      }
   ),
   [InputFieldNames.SECURITY_OTHER_VALUES]: Yup.array().when(
      InputFieldNames.SECURITY_OPTION,
      (securityOptions, field) => {
         return securityOptions.flat().includes(EligibilitySecurity.other.optionValue)
            ? field.min(1, 'Add at least one security requirement.')
            : field;
      }
   ),
};

const requirementsShape = Yup.object().shape({
   [InputFieldNames.PERIODICITY_NUM_START]: Yup.number().test(
      InputFieldNames.PERIODICITY_NUM_START,
      'Must be greater 0',
      (value) => (value ?? 0) > 0
   ),
   [InputFieldNames.PERIODICITY_NUM_END]: Yup.number()
      .when(InputFieldNames.PERIODICITY_NUM_START, (periodicityNumStart, schema) =>
         periodicityNumStart ? schema.required('Field is required') : schema
      )
      .test(InputFieldNames.PERIODICITY_NUM_END, 'Must be greater 0', (value) => (value ?? 0) > 0)
      .test(InputFieldNames.PERIODICITY_NUM_END, 'Must be greater than start periodicity', function (value) {
         if (value) {
            const { [InputFieldNames.PERIODICITY_NUM_START]: periodicityNumStart } = this.parent;
            return Number(value) > Number(periodicityNumStart);
         }
      }),
   [InputFieldNames.PERIODICITY_PERIOD]: Yup.string(),
   [InputFieldNames.SET_FORMAT]: Yup.boolean(),
   [InputFieldNames.ADD_FORMAT]: Yup.string().when(InputFieldNames.SET_FORMAT, (setFormat, schema) =>
      setFormat ? schema.required('Add at least one document format') : schema
   ),
});

const otherEligibiltyCriteria = {
   [InputFieldNames.SET_OTHER_REQUIREMENT]: Yup.boolean(),
   [InputFieldNames.OTHER_REQUIREMENT_VALUES]: Yup.array().when(
      InputFieldNames.SET_OTHER_REQUIREMENT,
      (setOtherRequirement, schema) =>
         setOtherRequirement?.[0]
            ? schema
                 .min(1, 'Select at least one other requirement')
                 .of(requirementsShape)
                 .required('Configure all selected requirements as required')
            : schema
   ),
};
export const ToolTipText = {
   earnings: 'Specify the average amount of cash that must flow into the borrower’s account over a period',
   equity: 'Specify the equity the user should contribute  to have access to the loan',
   security: 'Enable collateral and other securities for the loan product',
   otherSecurity:
      'Specify other security requirements for this loan product to be satisfied by the customer. ',
};
