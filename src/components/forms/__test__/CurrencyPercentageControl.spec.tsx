import { screen } from '@testing-library/react';
import { CurrencyPercentageControl, CurrencyPercentageControlProps } from '../CurrencyPercentageControl';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { TestForm } from '@app/tests/form-util';

describe('CurrencyPercentageControl component', () => {
   it('should render CurrencyPercentageControl component with provided props', () => {
      const defaultProps: CurrencyPercentageControlProps = {
         name: 'currencyPercentage',
         label: 'Currency Percentage',
         required: true,
         tooltipText: 'Tooltip Text',
         placeholder: '0',
         withChip: true,
         layout: 'horizontal',
         labelDescription: 'Description',
         mb: 2,
      };

      renderWithThemeProvider(
         <TestForm>
            <CurrencyPercentageControl {...defaultProps} />
         </TestForm>
      );

      // Check if the components are rendered with the provided props
      expect(screen.getByLabelText('Currency Percentage')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();

      // Check if buttons are rendered and can be toggled
      const currencyButton = screen.getByText('NGN');
      const percentButton = screen.getByText('percent');

      expect(currencyButton).toBeInTheDocument();
      expect(percentButton).toBeInTheDocument();
   });
});
