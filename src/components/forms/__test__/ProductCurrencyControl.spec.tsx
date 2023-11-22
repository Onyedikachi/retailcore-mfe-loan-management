import { render, screen } from '@testing-library/react';
import { ProductCurrencyControl, ProductCurrencyControlProps } from '../ProductCurrencyControl';
import { TestForm } from '@app/tests/form-util';

describe('ProductCurrencyControl component', () => {
   const defaultProps: ProductCurrencyControlProps = {
      name: 'currencyName',
      label: 'Currency Label',
      required: true,
      tooltipText: 'Currency Tooltip',
      placeholder: 'Select a currency',
   };

   it('should render ProductCurrencyControl component with provided props', () => {
      render(
         <TestForm>
            <ProductCurrencyControl {...defaultProps} options={['USD', 'EUR']} />
         </TestForm>
      );
      expect(screen.getByText(defaultProps.label!)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.placeholder!)).toBeInTheDocument();
   });
});
