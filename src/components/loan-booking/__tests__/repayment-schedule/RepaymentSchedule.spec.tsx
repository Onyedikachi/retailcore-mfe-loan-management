import { CreateProductSetup, silentError, render } from '@app/test/setup';
import { RepaymentSchedule } from '../../repayment-schedule/RepaymentSchedule';
import { BookLoanProvider } from '@app/providers/book-loan';

const downlaodButtonSelector = '#download-repayment';
const saveButtonSelector = '#repayment-save';
const nextButtonSelector = '#repayment-next';

describe('<RepaymentSchedule />', () => {
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
   describe('<RepaymentSchedule /> - Test Next, Draft & Download btn', () => {
      it('Should make sure user can download pdf and button is enabled', async () => {
         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <RepaymentSchedule />
               </BookLoanProvider>
            </CreateProductSetup>
         );
         const { container } = screen;
         const downlaodButtonSelectorbtn = container.querySelector(downlaodButtonSelector);
         expect((downlaodButtonSelectorbtn as HTMLButtonElement).disabled).toBeFalsy();
      });
      it('Should disable the Draft button', async () => {
         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <RepaymentSchedule />
               </BookLoanProvider>
            </CreateProductSetup>
         );
         const { container } = screen;
         const saveButtonSelectorbtn = container.querySelector(saveButtonSelector);
         expect((saveButtonSelectorbtn as HTMLButtonElement).disabled).toBeFalsy();
      });
      it('Should enable the Next button', async () => {
         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <RepaymentSchedule />
               </BookLoanProvider>
            </CreateProductSetup>
         );
         const { container } = screen;
         const nextButtonSelectorbtn = container.querySelector(nextButtonSelector);
         expect((nextButtonSelectorbtn as HTMLButtonElement).disabled).toBeFalsy();
      });
   });
});
