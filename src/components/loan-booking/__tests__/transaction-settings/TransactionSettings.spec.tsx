import { formTestUtil } from '@app/tests/form-util';
import { CreateProductSetup, silentError, render, act, fireEvent } from '@app/tests/setup';
import * as FormMeta from '@app/utils/validators/book-a-loan/transaction-settings';
import { TransactionSettings } from '../../transaction-settings';
const { InputFieldNames } = FormMeta;
import { BookLoanProvider } from '@app/providers/book-loan';

const submitButtonSelector = '#transaction-settings';

const disbursementMethodSelector = `#mui-component-select-${InputFieldNames.DISBURSEMENT_METHOD}`;
const disbursementAcctSelector = `#mui-component-select-${InputFieldNames.DISBURSEMENT_ACCOUNT}`;
const disbursementSwitchSelector = `input[name='${InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION}']`;

describe('<TransactionSettings/>', () => {
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
   describe('<TransactionSettings /> - Test Next & Draft btn', () => {
      it('Should disable Next & Save as Draft button when user tries to go to the next step without filling required fields', async () => {
         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <TransactionSettings />
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
   });
   describe('<TransactionSettings /> - DisbursementSettingsFields', () => {
      formTestUtil(
         <CreateProductSetup>
            <BookLoanProvider>
               <TransactionSettings />
            </BookLoanProvider>
         </CreateProductSetup>
      )([
         {
            testDescription: 'Should display `Select disbursement method` when user tries to skip field',
            selector: disbursementMethodSelector,
            acts: [{ click: true, blur: true }],
            expectedText: 'Select disbursement method',
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
         {
            testDescription: 'Should display `Select disbursement account` when user tries to skip field',
            selector: disbursementAcctSelector,
            acts: [
               { selector: disbursementAcctSelector, click: true, blur: true },
               { selector: disbursementMethodSelector, click: true, blur: true },
            ],
            expectedText: 'Select disbursement account',
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
         {
            testDescription:
               'Should display `Notificationd Channels` when user toggles Enable disbursement notif field',
            selector: disbursementSwitchSelector,
            acts: [{ click: true }],
            expectedText: 'Notification Channels',
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
      ]);
   });
   describe('<TransactionSettings /> - RepaymentSettings', () => {
      formTestUtil(
         <CreateProductSetup>
            <BookLoanProvider>
               <TransactionSettings />
            </BookLoanProvider>
         </CreateProductSetup>
      )([
         {
            testDescription:
               'Should display `Repayment Channel` Field when components when user tries to skip field',
            selector: submitButtonSelector,
            acts: [{ click: true }],
            expectedText: 'Repayment Channel',
            buttonStatus: {
               selector: submitButtonSelector,
               disabled: true,
            },
         },
      ]);
   });
});
