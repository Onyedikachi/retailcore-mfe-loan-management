import { render, screen } from '@testing-library/react';
import { headerData } from '../table-header-data';

jest.mock('@app/constants/dashboard', () => ({
   tabCardOptions: () => ({
      someTab: [{ label: 'Option1' }, { label: 'Option2' }],
   }),
}));

describe('headerData', () => {
   it('renders the table header data correctly', () => {
      const mockLoanProducts: any[] = [
         {
            customerName: 'John Doe',
            loanAmount: 5000,
            loanProduct: { name: 'Product1' },
            status: 'Approved',
            updatedOn: '2022-01-15',
         },
      ];

      const mockFilterLoanProduct = jest.fn();
      const mockFilterLoanInitiator = jest.fn();
      const mockFilterStatus = jest.fn();
      const mockFilterDate = jest.fn();
      render(
         <>
            {headerData(
               mockLoanProducts,
               mockFilterLoanInitiator,
               mockFilterLoanProduct,
               mockFilterStatus,
               mockFilterDate,
               'someTab'
            ).data.map((item) => (
               <div key={item.key}>
                  {item.element}
                  {item.rightIcon}
               </div>
            ))}
         </>
      );
      expect(screen.getByText('CUSTOMER NAME/ID')).toBeInTheDocument();
      expect(screen.getByText('LOAN AMOUNT')).toBeInTheDocument();
      expect(screen.getByText('LOAN PRODUCT')).toBeInTheDocument();
      expect(screen.getByText('STATUS')).toBeInTheDocument();
      expect(screen.getByText('UPDATED ON')).toBeInTheDocument();
   });
});
