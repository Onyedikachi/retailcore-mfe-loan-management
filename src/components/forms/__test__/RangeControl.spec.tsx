import { render, screen } from '@testing-library/react';
import { RangeControl } from '../RangeControl';
import { TestForm } from '@app/tests/form-util';

describe('RangeControl component', () => {
   it('should render RangeControl component with provided props', () => {
      const defaultProps = {
         firstName: 'first',
         secondName: 'second',
         firstPlaceHolder: 'First Placeholder',
         secondPlaceHolder: 'Second Placeholder',
         isFirstCurrency: true,
         isSecondCurrency: false,
         bridgeWord: 'to',
         extraLeft: '$',
         extraRight: 'per month',
      };

      render(
         <TestForm>
            <RangeControl {...defaultProps} />
         </TestForm>
      );

      expect(screen.getByPlaceholderText('First Placeholder')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Second Placeholder')).toBeInTheDocument();
      expect(screen.getByText('to')).toBeInTheDocument();

      expect(screen.getByText('$')).toBeInTheDocument();
      expect(screen.getByText('per month')).toBeInTheDocument();
   });
});
