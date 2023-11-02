import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { LoanProductDetails } from '../LoanProductDetails';

jest.mock('../../providers/individual-loan-dashboard', () => ({
   IndividualLoanDashboardProvider: jest.fn(({ children }) => children),
   useIndividualLoanDashboardContext: jest.fn(),
}));

describe('IndividualLoan Component', () => {
   const mockContextDashboard = {
      getLoanDataToModify: jest.fn(),
      getCustomer: jest.fn(),
   };

   require('../../providers/individual-loan-dashboard').useIndividualLoanDashboardContext.mockReturnValue(
      mockContextDashboard
   );

   it('renders with default values', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter>
               <LoanProductDetails />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
   });
});
