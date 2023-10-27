import { MemoryRouter } from 'react-router-dom';
import { BookLoanProvider } from '@app/providers/book-loan';
import { mockLoanProduct, mockedBookLoanData } from '@app/tests/test.utils';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { FacilityDetails } from '../../facility-details';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import { StepperProvider } from '@app/providers';
import { API_PATH } from '@app/constants';
import { silentError } from '@app/tests/setup';

jest.mock('../../../../providers/book-loan', () => ({
   BookLoanProvider: jest.fn(({ children }) => children),
   useBookLoanContext: jest.fn(),
}));
jest.mock('../../../../providers/individual-loan-dashboard', () => ({
   IndividualLoanDashboardProvider: jest.fn(({ children }) => children),
   useIndividualLoanDashboardContext: jest.fn(),
}));
jest.mock('../../../../providers/stepper', () => ({
   StepperProvider: jest.fn(({ children }) => children),
   useStepperContext: jest.fn(),
   setStepperContentCount: jest.fn(),
}));
describe('IndividualLoan Component', () => {
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
         if (req.url.includes(API_PATH.GetAllLoanProduct))
            return Promise.resolve(JSON.stringify(mockLoanProduct));
         else return Promise.reject({});
      });
   });

   afterEach(() => {
      fetchMock.resetMocks();
   });
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
   require('../../../../providers/individual-loan-dashboard').useIndividualLoanDashboardContext.mockReturnValue(
      mockContextDashboard
   );
   require('../../../../providers/book-loan').useBookLoanContext.mockReturnValue(mockContextBookLoan);
   require('../../../../providers/stepper').useStepperContext.mockReturnValue({
      activeStep: 0,
      setStepperContentCount: jest.fn(),
   });
   it('renders with default values', () => {
      renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <BookLoanProvider>
               <StepperProvider>
                  <MemoryRouter>
                     <FacilityDetails />
                  </MemoryRouter>
               </StepperProvider>
            </BookLoanProvider>
         </IndividualLoanDashboardProvider>
      );
   });
});
