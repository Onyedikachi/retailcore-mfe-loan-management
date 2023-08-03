/* eslint-disable max-len */
import { formTestUtil } from '@app/test/form-util';
import { EligibilityCriteria } from '../credit-personal-loan';
import { CreateProductSetup, silentError } from '@app/test/setup';
import { InputFieldNames } from '@app/utils/validators/personal-loan/eligibility-criteria';
import { EligibilityEarningsTypeOptions } from '@app/constants';

const submitButtonSelector = '#eligibility-submit-next';
const earningsSwitchSelector = `input[name='${InputFieldNames.SET_EARNINGS}']`;
const earningFixedRadioSelector = `input[name='${InputFieldNames.EARNINGS_TYPE}'][value='${EligibilityEarningsTypeOptions[0].value}']`;
const earningValueSelector = `input[name='${InputFieldNames.EARNINGS_VALUE}']`;
const accordionToggleSelector = (sectionIndex: number) =>
   `#panel${sectionIndex}-header.MuiAccordionSummary-gutters`;

describe('<EligibilityCriteria />', () => {
   const accordionToggleAct = { selector: accordionToggleSelector(0), click: true };

   /* eslint-disable no-console */
   let errorConsole: any | null = null;
   let warnConsole: any | null = null;

   beforeAll(() => {
      errorConsole = silentError(['was not wrapped in act(...)']);
      warnConsole =  silentError(['You have provided an out-of-range value'], 'warn');
   });

   afterAll(() => {
      console.error = errorConsole;
      console.warn = warnConsole;
   });
   /* eslint-enable no-console */
   
   describe('EarningsOrTurnOver', () => {
      formTestUtil(
         <CreateProductSetup>
            <EligibilityCriteria />
         </CreateProductSetup>
      )([
         {
            testDescription:
               'Should show earnings/turnover fields on toggle of earnings/turnover setup switch.',
            selector: earningsSwitchSelector,
            acts: [
               accordionToggleAct,
               { click: true, expectedText: EligibilityEarningsTypeOptions[1].label },
               { click: true, expectedNotText: EligibilityEarningsTypeOptions[1].label },
            ],
         },
         {
            testDescription:
               'Should disable next button when earnings/turnover is toggled on & no type earnings/turnover is selected',
            selector: earningsSwitchSelector,
            acts: [accordionToggleAct, { click: true }],
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
      ]);
   });
});
