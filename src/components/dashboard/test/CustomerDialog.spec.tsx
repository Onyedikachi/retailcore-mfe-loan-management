import { act } from '@testing-library/react';
import { renderWithThemeProvider } from '@app/components/atoms/test/test.utils';
import { CUSTOMER_MANAGEMENT_PATH } from '@app/constants';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import fetchMock from 'jest-fetch-mock';
import { silentError } from '@app/test/setup';
import { BookLoanProvider } from '@app/providers/book-loan';
import { mockCustomerData } from './test.utils';
import { CustomerInfoDialog } from '@app/components/loan-booking/customer-information/CustomerInfoDialog';

fetchMock.enableMocks();

describe('CustomerDialog Component', () => {
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

   const { GET_CUSTOMER } = CUSTOMER_MANAGEMENT_PATH;
   beforeEach(() => {
      fetchMock.mockResponse((req) => {
         if (req.url.includes(`${GET_CUSTOMER}`)) return Promise.resolve(JSON.stringify(mockCustomerData));
         else return Promise.reject({});
      });
   });

   afterEach(() => {
      fetchMock.resetMocks();
   });
   it('renders customer info dialog', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter>
                     <CustomerInfoDialog />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
   });
});
