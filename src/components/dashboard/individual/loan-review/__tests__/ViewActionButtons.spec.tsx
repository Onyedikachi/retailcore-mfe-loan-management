import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { API_PATH } from '@app/constants';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import fetchMock from 'jest-fetch-mock';
import { silentError } from '@app/tests/setup';
import { BookLoanProvider } from '@app/providers/book-loan';
import { ViewActionButtons } from '../ViewActions';

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

   afterEach(() => {
      fetchMock.resetMocks();
   });

   it('handles Return button click', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <ViewActionButtons />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });

      const returnButton = screen.getByText('Print');
      fireEvent.click(returnButton);
   });
   it('handles Return button click', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <ViewActionButtons />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });

      const returnButton = screen.getByText('Share');
      fireEvent.click(returnButton);
   });
   it('handles Return button click', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <ViewActionButtons />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });

      const returnButton = screen.getByText('Return to Dashboard');
      fireEvent.click(returnButton);
   });
});
