import * as Yup from 'yup';

export const InputFieldNames = {
   SET_EARNINGS: 'setEarnings',
   EARNINGS_TYPE: 'earningType',
   FIXED_EARNING_AMOUNT: 'fixedEarningAmount',
   FIXED_EARNING_NUM: 'fixedEarningNum',
   FIXED_EARNING_PERIOD: 'fixedEarningPeriod',
   PERCENTAGE_EARNING_PERCENT: 'percentageEarningPercent',
   PERCENTAGE_EARNING_NUM: 'percentageEarningNum',
   PERCENTAGE_EARNING_PERIOD: 'percentageEarningPeriod',

   SET_EQUITY: 'setEquity',
   EQUITY_CONTRIBUTION_TYPE: 'equityContributionType',
   FIXED_EQUITY_PERCENT: 'fixedEquityPercent',
   RANGE_EQUITY_PERCENT_START: 'rangeEquityPercentStart',
   RANGE_EQUITY_PERCENT_END: 'rangeEquityPercentEnd',

   SET_SECURITY: 'setSecurity',
   SECURITY_OPTION: 'securityOption',

   SET_OTHER_REQUIREMENT: 'setOtherRequirement',
} as const;

export const accordionLabels = [
   'Earnings/Turnover',
   'Equity Contribution',
   'Securities',
   'Other Eligibility Requirements',
];
export const securityOptions = ['Guarantor', 'Collateral Assets', 'Other Security Requirements'];

export const eligibilityInitialValues = () => ({
   [InputFieldNames.SET_EARNINGS]: false,
   [InputFieldNames.EARNINGS_TYPE]: '',
   [InputFieldNames.FIXED_EARNING_AMOUNT]: '',
   [InputFieldNames.FIXED_EARNING_NUM]: '',
   [InputFieldNames.FIXED_EARNING_PERIOD]: '',
   [InputFieldNames.PERCENTAGE_EARNING_PERCENT]: '',
   [InputFieldNames.PERCENTAGE_EARNING_NUM]: '',
   [InputFieldNames.PERCENTAGE_EARNING_PERIOD]: '',
   [InputFieldNames.SET_EQUITY]: false,
   [InputFieldNames.EQUITY_CONTRIBUTION_TYPE]: '',
   [InputFieldNames.FIXED_EQUITY_PERCENT]: '',
   [InputFieldNames.RANGE_EQUITY_PERCENT_START]: '',
   [InputFieldNames.RANGE_EQUITY_PERCENT_END]: '',
   [InputFieldNames.SET_SECURITY]: false,
   [InputFieldNames.SECURITY_OPTION]: [],
   [InputFieldNames.SET_OTHER_REQUIREMENT]: false,
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
   [InputFieldNames.FIXED_EARNING_AMOUNT]: Yup.string()
      .when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
         earningType[0] == 'fixed' ? field.required('Enter an amount') : field
      )
      .test(InputFieldNames.FIXED_EARNING_AMOUNT, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value.replace(/,/g, '')) > 0;
         }
      }),
   [InputFieldNames.FIXED_EARNING_NUM]: Yup.string()
      .when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
         earningType[0] == 'fixed' ? field.required('Field is required') : field
      )
      .test(InputFieldNames.FIXED_EARNING_NUM, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      }),
   [InputFieldNames.FIXED_EARNING_PERIOD]: Yup.string().when(
      InputFieldNames.EARNINGS_TYPE,
      (earningType, field) => (earningType[0] == 'fixed' ? field.required('Field is required') : field)
   ),
   [InputFieldNames.PERCENTAGE_EARNING_PERCENT]: Yup.string()
      .when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
         earningType[0] == 'percent' ? field.required('Enter a percentage') : field
      )
      .test(InputFieldNames.PERCENTAGE_EARNING_PERCENT, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      }),
   [InputFieldNames.PERCENTAGE_EARNING_NUM]: Yup.string()
      .when(InputFieldNames.EARNINGS_TYPE, (earningType, field) =>
         earningType[0] == 'percent' ? field.required('Field is required') : field
      )
      .test(InputFieldNames.PERCENTAGE_EARNING_NUM, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      }),
   [InputFieldNames.PERCENTAGE_EARNING_PERIOD]: Yup.string().when(
      InputFieldNames.EARNINGS_TYPE,
      (earningType, field) => (earningType[0] == 'percent' ? field.required('Field is required') : field)
   ),
};

const equityContributions = {
   [InputFieldNames.SET_EQUITY]: Yup.boolean(),
   [InputFieldNames.EQUITY_CONTRIBUTION_TYPE]: Yup.string().when(
      InputFieldNames.SET_EQUITY,
      (setEquity, field) => (setEquity ? field.required('Select contribution type') : field)
   ),
   [InputFieldNames.FIXED_EQUITY_PERCENT]: Yup.string()
      .when(InputFieldNames.EQUITY_CONTRIBUTION_TYPE, (equityContributionType, field) =>
         equityContributionType[0] == 'fixed' ? field.required('Enter a percentage') : field
      )
      .test(InputFieldNames.FIXED_EQUITY_PERCENT, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      }),
   [InputFieldNames.RANGE_EQUITY_PERCENT_START]: Yup.string()
      .when(InputFieldNames.EQUITY_CONTRIBUTION_TYPE, (equityContributionType, field) =>
         equityContributionType[0] == 'range' ? field.required('Enter min percentage') : field
      )
      .test(InputFieldNames.RANGE_EQUITY_PERCENT_START, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      }),
   [InputFieldNames.RANGE_EQUITY_PERCENT_END]: Yup.string()
      .when(InputFieldNames.EQUITY_CONTRIBUTION_TYPE, (equityContributionType, field) =>
         equityContributionType[0] == 'range' ? field.required('Enter max percentage') : field
      )
      .test(InputFieldNames.RANGE_EQUITY_PERCENT_START, 'Must be greater 0', function (value) {
         if (value) {
            return Number(value) > 0;
         }
      })
      .test(
         InputFieldNames.RANGE_EQUITY_PERCENT_END,
         'Must be greater than min percentage',
         function (value) {
            const { equityContributionType, rangeEquityPercentStart } = this.parent;
            if (equityContributionType == 'range' && value) return value > rangeEquityPercentStart;
         }
      ),
};
export const securities = {
   [InputFieldNames.SET_SECURITY]: Yup.boolean(),
   [InputFieldNames.SECURITY_OPTION]: Yup.array().when(InputFieldNames.SET_SECURITY, (setSecurity, field) =>
      setSecurity
         ? field.min(1, 'Select at least one security option').of(Yup.string().oneOf(securityOptions))
         : field
   ),
};
export const ToolTipText = {
   earnings: 'Specify the average amount of cash that must flow into the borrower’s account over a period',
   equity: 'Specify the equity the user should contribute  to have access to the loan',
   security: 'Enable collateral and other securities for the loan product',
   otherSecurity:
      'Specify other security requirements for this loan product to be satisfied by the customer. ',
};
