import { render, screen } from '@testing-library/react';
import { TestForm } from './test.utils';
import { LoanPrincipalRangeControl, LoanPrincipalControlProps } from '../LoanPrincipalRangeControl';

describe('LoanPrincipalRangeControl component', () => {
   const defaultProps: LoanPrincipalControlProps = {
      maxName: 'maxLoanPrincipal',
      maxLabel: 'Max Label',
      minName: 'minLoanPrincipal',
      minLabel: 'Min Label',
      required: true,
      maxTooltipText: 'Max Tooltip',
      minTooltipText: 'Min Tooltip',
      extraLeft: '$',
   };

   it('should render LoanPrincipalRangeControl component with provided props', () => {
      render(
         <TestForm>
            <LoanPrincipalRangeControl {...defaultProps} />
         </TestForm>
      );
      expect(screen.getByText(defaultProps.minLabel!)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.maxLabel!)).toBeInTheDocument();
   });
});
