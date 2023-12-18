import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { API_PATH } from '@app/constants';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import fetchMock from 'jest-fetch-mock';
import { silentError } from '@app/tests/setup';
import { BookLoanProvider } from '@app/providers/book-loan';
import { LoanActionRequest } from '../individual/customer-loan-details/LoanActionRequest';
import { mockLoanProduct } from '../../../tests/test.utils';

fetchMock.enableMocks();

describe('LoanActionRequest Component', () => {
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

   beforeEach(() => {
      fetchMock.mockResponse((req) => {
         if (req.url.includes(API_PATH.IndividualLoan))
            return Promise.resolve(JSON.stringify(mockLoanProduct));
         else return Promise.reject({});
      });
   });

   afterEach(() => {
      fetchMock.resetMocks();
   });

   it('renders with loan action details', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter>
                     <LoanActionRequest action={''} id={''} handleSubmit={() => true} />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
   });
});
