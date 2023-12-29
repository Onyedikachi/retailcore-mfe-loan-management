import { render } from '@testing-library/react';
import { BookLoanProvider } from '@app/providers/book-loan';
import { mockProductData } from '@app/tests/test.utils';
import { LoanInformation } from '../loan-information';

jest.mock('../../../providers/book-loan', () => ({
   BookLoanProvider: jest.fn(({ children }) => children),
   useBookLoanContext: jest.fn(),
}));
describe('CustomerAccountInformation', () => {
   const mockContextValue = { selectedProduct: mockProductData };

   require('../../../providers/book-loan').useBookLoanContext.mockReturnValue(mockContextValue);

   const { getByText } = render(
      <BookLoanProvider>
         <LoanInformation />
      </BookLoanProvider>
   );

   it('renders the loan information correctly', () => {
      expect(getByText('Loan Information')).toBeInTheDocument();
      expect(getByText('Facility Details')).toBeInTheDocument();
      expect(getByText('Collateral & Equity Contribution')).toBeInTheDocument();
      expect(getByText('Penalty Setup')).toBeInTheDocument();
      expect(getByText('Account Entires')).toBeInTheDocument();
   });
});
