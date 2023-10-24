import { CreateProductSetup, silentError, render, act, fireEvent } from '@app/test/setup';
import { CustomerInformation } from '../../customer-information';
import userEvent from '@testing-library/user-event';
import { BookLoanProvider } from '@app/providers/book-loan';

const submitButtonSelector = '#customer-info';

describe('<CustomerInformation/>', () => {
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

   describe('Test', () => {
      it('Should display `Select customer account` when user tries to go next without selecting customer', async () => {
         const user = userEvent.setup();
         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <CustomerInformation />
               </BookLoanProvider>
            </CreateProductSetup>
         );
         const { container } = screen;

         const customerInfoNextbtn = container.querySelector(submitButtonSelector);
         await act(async () => {
            fireEvent.click(customerInfoNextbtn!);
         });
         expect(screen.baseElement).toHaveTextContent('Select customer account');
      });
      it('Should have an input that receives customers information', async () => {
         const user = userEvent.setup();

         const screen = render(
            <CreateProductSetup>
               <BookLoanProvider>
                  <CustomerInformation />
               </BookLoanProvider>
            </CreateProductSetup>
         );
         const { container, getByRole } = screen;
         let textbox = getByRole('combobox');

         act(() => {
            fireEvent.keyDown(textbox);
         });
         expect(screen.baseElement).toHaveTextContent(`Customer's Account Number`);
      });
   });
});
