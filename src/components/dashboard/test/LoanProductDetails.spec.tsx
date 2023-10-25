import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithThemeProvider } from '@app/components/atoms/test/test.utils';
import { API_PATH } from '@app/constants';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import fetchMock from 'jest-fetch-mock';
import { silentError } from '@app/test/setup';
import { LoanProductDetail } from '../individual/loan-product-details';
import { BookLoanProvider } from '@app/providers/book-loan';
import { mockLoanProduct } from './test.utils';

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
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <LoanProductDetail />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
   });

   it('handles Return button click', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <LoanProductDetail />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });

      const returnButton = screen.getByText('Return');
      fireEvent.click(returnButton);
   });
});
