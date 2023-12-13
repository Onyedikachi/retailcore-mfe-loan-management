import { render } from '@testing-library/react';
import { CreateProductSetup } from '@app/tests/setup';
import { ProcessSummary } from '../../process-summary/ProcessSummary';
import { BookLoanProvider } from '@app/providers/book-loan';

describe('<ProcessSummary />', () => {
   it('should render properly', () => {
      const { getByRole } = render(
         <CreateProductSetup>
            <BookLoanProvider>
               <ProcessSummary />
            </BookLoanProvider>
         </CreateProductSetup>
      );
      const cancelButton = getByRole('button', { name: 'Cancel' });
      expect(cancelButton).toBeInTheDocument();

      const modifyButton = getByRole('button', { name: 'Modify' });
      expect(modifyButton).toBeInTheDocument();

      const submitButton = getByRole('button', { name: 'Submit' });
      expect(submitButton).toBeInTheDocument();
   });
});
