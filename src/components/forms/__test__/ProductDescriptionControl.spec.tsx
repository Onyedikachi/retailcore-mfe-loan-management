import { render, screen } from '@testing-library/react';
import { TestForm } from './test.utils';
import { ProductDescriptionControl, ProductDescriptionControlProps } from '../ProductDescriptionControl';

describe('ProductDescriptionControl component', () => {
   const defaultProps: ProductDescriptionControlProps = {
      name: 'descriptionName',
      label: 'Description Label',
      required: true,
      tooltipText: 'Description Tooltip',
      placeholder: 'Enter a detailed description',
   };

   it('should render ProductDescriptionControl component with provided props', () => {
      render(
         <TestForm>
            <ProductDescriptionControl {...defaultProps} />
         </TestForm>
      );

      const label = screen.getByText(defaultProps.label!);
      const textarea = screen.getByPlaceholderText(defaultProps.placeholder!);

      expect(label).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
   });
});
