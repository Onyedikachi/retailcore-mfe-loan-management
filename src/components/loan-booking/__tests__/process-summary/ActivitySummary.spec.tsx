import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '../../../../providers/individual-loan-dashboard';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { ActivitySummary } from '../../process-summary/ActivitySummary';

jest.mock('../../../../providers/individual-loan-dashboard', () => ({
   IndividualLoanDashboardProvider: jest.fn(({ children }) => children),
   useIndividualLoanDashboardContext: jest.fn(),
}));

describe('IndividualLoan Component', () => {
   const mockContextDashboard = {
      getLoanDataToModify: jest.fn(),
      getCustomer: jest.fn(),
   };

   require('../../../../providers/individual-loan-dashboard').useIndividualLoanDashboardContext.mockReturnValue(
      mockContextDashboard
   );
   const component = (
      <IndividualLoanDashboardProvider>
         <MemoryRouter>
            <ActivitySummary />
         </MemoryRouter>
      </IndividualLoanDashboardProvider>
   );

   it('renders with default values', () => {
      const { getByText } = renderWithThemeProvider(component);
      expect(getByText('ACTIVITY LOG')).toBeInTheDocument();
   });
});
