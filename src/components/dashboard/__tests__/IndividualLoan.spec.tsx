import { screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoan, convertToUppercase } from '../individual';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';

jest.mock('../../../providers/individual-loan-dashboard', () => ({
   IndividualLoanDashboardProvider: jest.fn(({ children }) => children),
   useIndividualLoanDashboardContext: jest.fn(),
}));
describe('IndividualLoan Component Test', () => {
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
      const {getByText, } = renderWithThemeProvider(
          <IndividualLoanDashboardProvider>
             <MemoryRouter initialEntries={['/individual?tab=requests']}>
                <IndividualLoan />
             </MemoryRouter>
          </IndividualLoanDashboardProvider>
       );
       expect(getByText('Approved')).toBeInTheDocument();
    });

    it('handles status click', () => {
      const {getByText, } = renderWithThemeProvider(
          <IndividualLoanDashboardProvider>
             <MemoryRouter initialEntries={['/individual?tab=requests']}>
                <IndividualLoan />
             </MemoryRouter>
          </IndividualLoanDashboardProvider>
       );
       expect(getByText('Draft')).toBeInTheDocument();
    });

    it('handles status click', () => {
      const {getByText, } = renderWithThemeProvider(
          <IndividualLoanDashboardProvider>
             <MemoryRouter initialEntries={['/individual?tab=requests']}>
                <IndividualLoan />
             </MemoryRouter>
          </IndividualLoanDashboardProvider>
       );
       expect(getByText('In-Review')).toBeInTheDocument();
    });

    it('handles status click', () => {
      const {getByText, } = renderWithThemeProvider(
          <IndividualLoanDashboardProvider>
             <MemoryRouter initialEntries={['/individual?tab=requests']}>
                <IndividualLoan />
             </MemoryRouter>
          </IndividualLoanDashboardProvider>
       );
       expect(getByText('In-Issue')).toBeInTheDocument();
    });

    it('handles status click', () => {
      const {getByText, } = renderWithThemeProvider(
          <IndividualLoanDashboardProvider>
             <MemoryRouter initialEntries={['/individual?tab=requests']}>
                <IndividualLoan />
             </MemoryRouter>
          </IndividualLoanDashboardProvider>
       );
       expect(getByText('Initiated by me')).toBeInTheDocument();
    });

   it('handles status click', () => {
     const {getByText} = renderWithThemeProvider(
         <IndividualLoanDashboardProvider>
            <MemoryRouter initialEntries={['/individual?tab=records']}>
               <IndividualLoan />
            </MemoryRouter>
         </IndividualLoanDashboardProvider>
      );
      const statusCard = getByText('Performing');
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

describe('convertToUppercase function', () => {
   test('converts sentence to uppercase without spaces or hyphens', () => {
     const sentence = 'This is a Test-Sentence';
     const result = convertToUppercase(sentence);
     expect(result).toBe('THISISATESTSENTENCE');
   });
 
   test('converts "initiated system-wide" correctly', () => {
     const sentence = 'initiated system-wide';
     const result = convertToUppercase(sentence);
     expect(result).toBe('INITIATEDBYSYSTEM');
   });
 
   test('converts "sent system-wide" correctly', () => {
     const sentence = 'sent system-wide';
     const result = convertToUppercase(sentence);
     expect(result).toBe('SENTTOSYSTEM');
   });
 
   test('converts "created system-wide" correctly', () => {
     const sentence = 'created system-wide';
     const result = convertToUppercase(sentence);
     expect(result).toBe('CREATEDBYSYSTEM');
   });
 
   test('converts "approved system-wise" correctly', () => {
     const sentence = 'approved system-wise';
     const result = convertToUppercase(sentence);
     expect(result).toBe('APPROVEDSYSTEMWISE');
   });
 
   test('handles empty string', () => {
     const sentence = '';
     const result = convertToUppercase(sentence);
     expect(result).toBe('');
   });
 
   test('handles sentence with spaces and hyphens', () => {
     const sentence = '   test with spaces - and hyphens   ';
     const result = convertToUppercase(sentence);
     expect(result).toBe('TESTWITHSPACESANDHYPHENS');
   });

   test('converts "approved system-wise" correctly', () => {
      const sentence = 'approved system-wide';
      const result = convertToUppercase(sentence);
      expect(result).toBe('APPROVEDBYSYSTEM');
    });
 });