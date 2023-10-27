import { render, screen, fireEvent } from '@testing-library/react';
import { BookLoanProvider } from '@app/providers/book-loan';
import { CustomerAccountInformation } from '../../customer-information/CustomerAccountInfo';
import { mockCustomerData } from '@app/components/dashboard/test/test.utils';

jest.mock('../../../../providers/book-loan', () => ({
   BookLoanProvider: jest.fn(({ children }) => children),
   useBookLoanContext: jest.fn(),
}));
describe('CustomerAccountInformation', () => {
   const mockContextValue = {
      selectedCustomer: mockCustomerData,
      selectedCustomerId: '1',
      persona: 'personal',
   };
   require('../../../../providers/book-loan').useBookLoanContext.mockReturnValue(mockContextValue);

   const renderComponent = () => {
      render(
         <BookLoanProvider>
            <CustomerAccountInformation />
         </BookLoanProvider>
      );
   };

   it('should render component with the provided customer information', () => {
      renderComponent();
      const expectedContent = 'Customer’s Information';
      expect(screen.getByText(expectedContent)).toBeInTheDocument();
   });

   it('should open customer details modal when "View all customer information" is clicked', () => {
      renderComponent();
      const viewAllInfoButton = screen.getByText('View all customer information');
      fireEvent.click(viewAllInfoButton);
      expect(screen.getByText("Customer's Information")).toBeInTheDocument();
   });
});
