import { render, screen } from '@testing-library/react';
import { EarningsControl, EarningsControlProps } from '../EarningsControls';
import { TestForm } from './test.utils';

describe('EarningsControl component', () => {
   const defaultProps: EarningsControlProps = {
      bridgeWord: 'to',
      extraLeft: '$',
      extraRight: 'per month',
      firstPlaceHolder: 'First Placeholder',
      thirdPlaceHolder: 'Third Placeholder',
      firstName: 'first',
      secondName: 'second',
      thirdName: 'third',
      isCurrency: true,
   };

   it('should render EarningsControl component with provided props', () => {
      render(
         <TestForm>
            <EarningsControl {...defaultProps} />
         </TestForm>
      );

      expect(screen.getByText('to')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('First Placeholder')).toBeInTheDocument();
      expect(screen.getByText('Third Placeholder')).toBeInTheDocument();
      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('per month')).toBeInTheDocument();
   });
});
