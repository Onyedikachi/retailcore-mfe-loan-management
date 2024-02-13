import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { API_PATH } from '@app/constants';
import { MemoryRouter } from 'react-router-dom';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import fetchMock from 'jest-fetch-mock';
import { silentError } from '@app/tests/setup';
import { BookLoanProvider } from '@app/providers/book-loan';
import { LoanReviewDialogs } from '../LoanReviewDialogs';

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
   const setShowCancelDialogMock = jest.fn();
   const setShowApprovalDialogMock = jest.fn();
   const setShowResponseDialogMock = jest.fn();
   const setShowRejectDialogMock = jest.fn();

   it('Show approval Dialog box', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <LoanReviewDialogs
                        id={''}
                        showCancelDialog={false}
                        setShowCancelDialog={setShowCancelDialogMock}
                        showApprovalDialog={true}
                        setShowApprovalDialog={setShowApprovalDialogMock}
                        showResponseDialog={true}
                        setShowResponseDialog={setShowResponseDialogMock}
                        showRejectDialog={true}
                        setShowRejectDialog={setShowRejectDialogMock}
                     />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
      expect(screen.getByText('Do you want to approve this loan booking request?')).toBeInTheDocument();
   });
   it('Show approval Dialog box', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <LoanReviewDialogs
                        id={''}
                        showCancelDialog={false}
                        setShowCancelDialog={setShowCancelDialogMock}
                        showApprovalDialog={true}
                        setShowApprovalDialog={setShowApprovalDialogMock}
                        showResponseDialog={true}
                        setShowResponseDialog={setShowResponseDialogMock}
                        showRejectDialog={true}
                        setShowRejectDialog={setShowRejectDialogMock}
                     />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
      expect(screen.getByText('Confirm')).toBeInTheDocument();
   });
   it('Show approval Dialog box', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <LoanReviewDialogs
                        id={''}
                        showCancelDialog={false}
                        setShowCancelDialog={setShowCancelDialogMock}
                        showApprovalDialog={true}
                        setShowApprovalDialog={setShowApprovalDialogMock}
                        showResponseDialog={true}
                        setShowResponseDialog={setShowResponseDialogMock}
                        showRejectDialog={true}
                        setShowRejectDialog={setShowRejectDialogMock}
                     />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
      expect(screen.getByText('Cancel')).toBeInTheDocument();
   });
   it('Show "Return to dashboard" button', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <LoanReviewDialogs
                        id={''}
                        showCancelDialog={false}
                        setShowCancelDialog={setShowCancelDialogMock}
                        showApprovalDialog={false}
                        setShowApprovalDialog={setShowApprovalDialogMock}
                        showResponseDialog={true}
                        setShowResponseDialog={setShowResponseDialogMock}
                        showRejectDialog={true}
                        setShowRejectDialog={setShowRejectDialogMock}
                     />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
      expect(screen.getByText('Return to dashboard')).toBeInTheDocument();
   });
   it('Show "Return to dashboard" button', async () => {
      act(() => {
         renderWithThemeProvider(
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <MemoryRouter initialEntries={['/individual?tab=records']}>
                     <LoanReviewDialogs
                        id={''}
                        showCancelDialog={false}
                        setShowCancelDialog={setShowCancelDialogMock}
                        showApprovalDialog={false}
                        setShowApprovalDialog={setShowApprovalDialogMock}
                        showResponseDialog={false}
                        setShowResponseDialog={setShowResponseDialogMock}
                        showRejectDialog={true}
                        setShowRejectDialog={setShowRejectDialogMock}
                     />
                  </MemoryRouter>
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         );
      });
      expect(screen.getByText('Provide reason for rejection')).toBeInTheDocument();
      expect(screen.getByText('Route request to')).toBeInTheDocument();
      expect(screen.getByText('REJECTION')).toBeInTheDocument();
   });
   
});
