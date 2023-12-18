import { screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoan } from '../individual';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';

jest.mock('../../../providers/individual-loan-dashboard', () => ({
   IndividualLoanDashboardProvider: jest.fn(({ children }) => children),
   useIndividualLoanDashboardContext: jest.fn(),
}));
describe('IndividualLoan Component', () => {
   const mockContextValue = {
      getLoanProducts: jest.fn(),
      dataCount: 0,
   };
   require('../../../providers/individual-loan-dashboard').useIndividualLoanDashboardContext.mockReturnValue(
      mockContextValue
   );

   it('renders with default values', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <IndividualLoan />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
      expect(screen.getByText('Requests')).toBeInTheDocument();
      expect(screen.getByText('Records')).toBeInTheDocument();
   });

   it('handles status click', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <IndividualLoan />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
      const statusCard = screen.getByText('Performing');
      fireEvent.click(statusCard);
   });

   it('handles status click', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <IndividualLoan />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
      const statusCard = screen.getByText('Closed');
      fireEvent.click(statusCard);
   });

   it('handles status click', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <IndividualLoan />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
      const statusCard = screen.getByText('Non-Performing');
      fireEvent.click(statusCard);
   });
   it('handles status click', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <IndividualLoan />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
      const statusCard = screen.getByText('All');
      fireEvent.click(statusCard);
   });
});
