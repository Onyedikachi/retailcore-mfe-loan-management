import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import { BookIndividualLoan } from '../BookIndividualLoan';
import { BookLoanProvider } from '@app/providers/book-loan';
import { StepperProvider } from '@app/providers/stepper';
import { mockedBookLoanData } from '@app/tests/test.utils';
import { renderWithThemeProvider } from '@app/tests/theme.utils';

jest.mock('../../providers/individual-loan-dashboard', () => ({
   IndividualLoanDashboardProvider: jest.fn(({ children }) => children),
   useIndividualLoanDashboardContext: jest.fn(),
}));
jest.mock('../../providers/book-loan', () => ({
   BookLoanProvider: jest.fn(({ children }) => children),
   useBookLoanContext: jest.fn(),
}));
jest.mock('../../providers/stepper', () => ({
   StepperProvider: jest.fn(({ children }) => children),
   useStepperContext: jest.fn(),
   setStepperContentCount: jest.fn(),
}));

describe('IndividualLoan Component', () => {
   const mockContextDashboard = {
      getLoanDataToModify: jest.fn(),
      getCustomer: jest.fn(),
   };
   const mockContextBookLoan = {
      getLoanProducts: jest.fn(),
      dataCount: 0,
      updateBookLoanData: jest.fn(),
      getCustomersData: jest.fn(),
      getCustomerDetails: jest.fn(),
      accountNumbers: [],
      customerEligibility: { message: '' },
      bookLoanData: mockedBookLoanData,
   };
   require('../../providers/individual-loan-dashboard').useIndividualLoanDashboardContext.mockReturnValue(
      mockContextDashboard
   );
   require('../../providers/book-loan').useBookLoanContext.mockReturnValue(mockContextBookLoan);
   require('../../providers/stepper').useStepperContext.mockReturnValue({
      activeStep: 0,
      setStepperContentCount: jest.fn(),
   });

   it('renders with default values', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <BookLoanProvider>
               <StepperProvider>
                  <MemoryRouter>
                     <BookIndividualLoan />
                  </MemoryRouter>
               </StepperProvider>
            </BookLoanProvider>
         </IndividualLoanDashboardProvider>
      );
   });
});
