import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { API_PATH } from '@app/constants';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import fetchMock from 'jest-fetch-mock';
import { silentError } from '@app/tests/setup';
import { BookLoanProvider } from '@app/providers/book-loan';
import { CustomerLoanDetails } from '@app/pages/CustomerLoanDetails';
import { mockLoanProduct } from '../../../tests/test.utils';

fetchMock.enableMocks();

describe('LoanProductDetails Component', () => {
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

   it('renders with loan product details', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter>
                     <CustomerLoanDetails />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
   });

   it('handles opening customer details dialog', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <BookLoanProvider>
               <MemoryRouter>
                  <CustomerLoanDetails />
               </MemoryRouter>
            </BookLoanProvider>
         </IndividualLoanDashboardProvider>
      );

      fireEvent.click(screen.getByText('View Full Customer Information'));

      expect(screen.getByText("Customer's Information")).toBeInTheDocument();
   });
   it('handles navigation to loan details page', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <BookLoanProvider>
               <MemoryRouter>
                  <CustomerLoanDetails />
               </MemoryRouter>
            </BookLoanProvider>
         </IndividualLoanDashboardProvider>
      );

      fireEvent.click(screen.getByText('View Loan Details'));
   });

   it('renders the loan management title', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <BookLoanProvider>
               <MemoryRouter>
                  <CustomerLoanDetails />
               </MemoryRouter>
            </BookLoanProvider>
         </IndividualLoanDashboardProvider>
      );

      expect(screen.getByText('LOAN MANAGEMENT')).toBeInTheDocument();
   });
});
