import { render } from '@testing-library/react';
import { CreateProductSetup } from '@app/tests/setup';

import { GridComponent } from '../GridComponent';
import { BookLoanProvider } from '@app/providers/book-loan';

describe('<GridComponent />', () => {
   it('should render properly', () => {
      const { getByRole, getByText } = render(
         <CreateProductSetup>
            <BookLoanProvider>
               <GridComponent
                  key={'key'}
                  property={'Impacted Ledger'}
                  secondproperty={'Debit Ledger'}
                  thirdproperty={'Credit Ledger'}
                  fourthproperty={'Charge Value'}
                  value={'Test asset primum ledger 5000'}
                  heading={'Applicable Collateral Asset'}
                  secondValue={'Cash 234'}
                  thirdValue={'Cash 235'}
                  fourthValue={'45'}
               />
            </BookLoanProvider>
         </CreateProductSetup>
      );
      const ApplicableCollateralAssetText = getByText('Applicable Collateral Asset');
      expect(ApplicableCollateralAssetText).toBeInTheDocument();

      const DebitKey = getByText('Debit Ledger');
      expect(DebitKey).toBeInTheDocument();
      const CreditKey = getByText('Credit Ledger');
      expect(CreditKey).toBeInTheDocument();

      const DebitValue = getByText('Cash 234');
      expect(DebitValue).toBeInTheDocument();

      const CreditValue = getByText('Cash 235');
      expect(CreditValue).toBeInTheDocument();

      const LedgerKey = getByText('Impacted Ledger');
      expect(LedgerKey).toBeInTheDocument();

      const LedgerValue = getByText('Test asset primum ledger 5000');
      expect(LedgerValue).toBeInTheDocument();
   });
});
