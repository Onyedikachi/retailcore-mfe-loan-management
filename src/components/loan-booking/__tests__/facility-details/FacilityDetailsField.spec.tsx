import { formTestUtil } from '@app/tests/form-util';
import { CreateProductSetup, silentError, render, act, fireEvent } from '@app/tests/setup';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { FacilityDetails } from '../../facility-details';
const { InputFieldNames } = FormMeta;
import { BookLoanProvider } from '../../../../providers/book-loan';
import { mockProductData } from '@app/tests/test.utils';

const submitButtonSelector = '#facility-details';
const equityContribSelector = `input[name='${InputFieldNames.EQUITY_CONTRIB}']`;
const moratoriumSwitchSelector = `input[name='${InputFieldNames.ENABLE_MORATORIUM_PERIOD}']`;
const moratoriumNumberSelector = `input[name='${InputFieldNames.MORATORIUM_PERIOD_VALUE}']`;
const graceSwitchSelector = `input[name='${InputFieldNames.ENABLE_GRACE_PERIOD}']`;
const graceperiodSelector = `input[name='${InputFieldNames.GRACE_PERIOD}']`;
const gracenumberSelector = `input[name='${InputFieldNames.GRACE_PERIOD_VALUE}']`;
const recognizeMoratoriumSelector = `#mui-component-select-${InputFieldNames.RECOGNISE_MORATORIUM_PERIOD}`;

jest.mock('../../../../providers/book-loan', () => ({
   BookLoanProvider: jest.fn(({ children }) => children),
   useBookLoanContext: jest.fn(),
}));
describe('<FacilityDetails /> ', () => {
   const mockContextValue = { selectedProduct: mockProductData };

   require('../../../../providers/book-loan').useBookLoanContext.mockReturnValue(mockContextValue);

   /* eslint-disable no-console */
   let errorConsole: any | null = null;
   let warnConsole: any | null = null;

   beforeAll(() => {
      errorConsole = silentError(['was not wrapped in act(...)']);
      warnConsole = silentError(['You have provided an out-of-range value'], 'warn');
   });

   afterAll(() => {
      console.error = errorConsole;
      console.warn = warnConsole;
   });

   describe('<FacilityDetails /> - FacilityDetailsFields', () => {
      it('Should disable Next & Save as Draft button when user tries to go to the next step without filling required fields', async () => {
         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <FacilityDetails />
               </BookLoanProvider>
            </CreateProductSetup>
         );
         const { container } = screen;
         const facilityDetailsNextbtn = container.querySelector(submitButtonSelector);
         await act(async () => {
            fireEvent.click(facilityDetailsNextbtn!);
         });
         expect((facilityDetailsNextbtn as HTMLButtonElement).disabled).toBeTruthy();
      });
      it('Should show `Enter loan product name`in the component when field is skipped', async () => {
         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <FacilityDetails />
               </BookLoanProvider>
            </CreateProductSetup>
         );

         const { container } = screen;
         const facilityDetailsNextbtn = container.querySelector(submitButtonSelector);
         await act(async () => {
            fireEvent.click(facilityDetailsNextbtn!);
         });
         expect(screen.baseElement).toHaveTextContent('Enter loan product name');
      });

      it('Should show `Enter purpose of loan request` in the component when user skips the field', async () => {
         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <FacilityDetails />
               </BookLoanProvider>
            </CreateProductSetup>
         );

         const { container } = screen;
         const facilityDetailsNextbtn = container.querySelector(submitButtonSelector);
         await act(async () => {
            fireEvent.click(facilityDetailsNextbtn!);
         });
         expect(screen.baseElement).toHaveTextContent('Enter purpose of loan request');
      });
   });

   describe('<FacilityDetails /> - CollateralAndEquityContribFields', () => {
      formTestUtil(
         <CreateProductSetup>
            <BookLoanProvider>
               <FacilityDetails />
            </BookLoanProvider>
         </CreateProductSetup>
      )([
         {
            testDescription: 'Should display `Equity Contribution` field when accordion is opened',
            selector: equityContribSelector,
            acts: [{ selector: equityContribSelector, click: true }, { typeText: '20' }],
            expectedText: 'Equity Contribution',
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: false,
            },
         },
      ]);
   });

   describe('<FacilityDetails /> - LoanManagementSettingsField', () => {
      formTestUtil(
         <CreateProductSetup>
            <BookLoanProvider>
               <FacilityDetails />
            </BookLoanProvider>
         </CreateProductSetup>
      )([
         {
            testDescription:
               'Should disable next button when Loan Management Settings Field is toggled on & no value is selected',
            selector: moratoriumSwitchSelector,
            acts: [{ click: true }],
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
         {
            testDescription: 'Should display moratorium field only when user toggles on the moratorim switch',
            selector: moratoriumNumberSelector,
            acts: [{ selector: moratoriumSwitchSelector, click: true }],
            expectedText: 'Enable Moratorium Period',
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
         // {
         //    testDescription: 'Should display `Enable Grace period` field only when switch is turned on',
         //    selector: moratoriumSwitchSelector,
         //    acts: [{ selector: moratoriumSwitchSelector, click: true }],
         //    expectedText: 'Enable Grace Period',
         //    buttonStatus: {
         //       selector: submitButtonSelector,
         //       disabled: true,
         //    },
         // },
         {
            testDescription: 'Should display `Field is Required` when does not select moratorium period',
            selector: moratoriumSwitchSelector,
            acts: [
               { selector: moratoriumSwitchSelector, click: true },
               { selector: recognizeMoratoriumSelector, click: true },
               { selector: moratoriumNumberSelector, typeText: '6', clear: true, blur: true },
            ],
            expectedText: 'Field is required',
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
         {
            testDescription:
               'Should display `Field is Required` when user does not fill the number field for moratorium period',
            selector: moratoriumSwitchSelector,
            acts: [
               { selector: moratoriumSwitchSelector, click: true },
               { selector: moratoriumNumberSelector, click: true, typeText: '6', clear: true, blur: true },
            ],
            expectedText: 'Field is required',
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
         // {
         //    testDescription: 'Should display `Grace period` field only when switch is turned on',
         //    selector: graceSwitchSelector,
         //    acts: [{ selector: graceSwitchSelector, click: true }],
         //    expectedText: 'Grace Period',
         //    buttonStatus: {
         //       selector: submitButtonSelector,
         //       disabled: true,
         //    },
         // },
         // {
         //    testDescription:
         //       'Should display `Field is required` when grace period number is not filled and the toggle is on',
         //    selector: graceSwitchSelector,
         //    acts: [
         //       { selector: graceSwitchSelector, click: true },
         //       { selector: gracenumberSelector, click: true, blur: true },
         //    ],
         //    expectedText: 'Field is required',
         //    buttonStatus: {
         //       selector: submitButtonSelector,
         //       disabled: true,
         //    },
         // },
         // {
         //    testDescription:
         //       'Should display `Field is required` when grace period number is not filled and the toggle is on',
         //    selector: graceSwitchSelector,
         //    acts: [
         //       { selector: graceSwitchSelector, click: true },
         //       { selector: graceperiodSelector, click: true, blur: true },
         //       { selector: gracenumberSelector, click: true, blur: true },
         //    ],
         //    expectedText: 'Field is required',
         //    buttonStatus: {
         //       selector: submitButtonSelector,
         //       disabled: true,
         //    },
         // },
      ]);
   });
});
