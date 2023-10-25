import { screen, fireEvent, act } from '@testing-library/react';
import { LoanTable } from '../individual/LoanTable';
import { renderWithThemeProvider } from '@app/components/atoms/test/test.utils';
import { API_PATH } from '@app/constants';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import fetchMock from 'jest-fetch-mock';
import { silentError } from '@app/test/setup';

jest.mock('../../../providers/individual-loan-dashboard', () => ({
   IndividualLoanDashboardProvider: jest.fn(({ children }) => children),
   useIndividualLoanDashboardContext: jest.fn(),
}));

fetchMock.enableMocks();
describe('LoanTable Component', () => {
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
         if (req.url.includes(API_PATH.IndividualLoan)) return Promise.resolve(JSON.stringify({ data: '' }));
         else return Promise.reject({});
      });
   });

   afterEach(() => {
      fetchMock.resetMocks();
   });
   const mockContextValue = {
      getLoanProducts: jest.fn(),
      dataCount: 0,
   };
   require('../../../providers/individual-loan-dashboard').useIndividualLoanDashboardContext.mockReturnValue(
      mockContextValue
   );
   it('renders with default values', () => {
      const { container } = renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <LoanTable />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );

      const inputElement = container.querySelector('input[name="searchBy"]') as HTMLInputElement;
      expect(inputElement).toBeInTheDocument();
      expect(screen.getByText('Refresh')).toBeInTheDocument();
      expect(screen.getByText('Download')).toBeInTheDocument();
   });

   it('handles search input', () => {
      const { container } = renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <LoanTable />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
      const searchInput = container.querySelector('input[name="searchBy"]') as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'TestProduct' } });

      expect(searchInput).toHaveValue('TestProduct');
   });

   it('handles refresh button', async () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <LoanTable />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
      fireEvent.click(screen.getByText('Refresh'));
   });

   it('handles download button', async () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <LoanTable />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );

      act(() => {
         fireEvent.click(screen.getByText('Download'));
      });
   });
});
