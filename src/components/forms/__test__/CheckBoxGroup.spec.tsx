import { render, fireEvent, screen } from '@testing-library/react';
import { FormControlBase } from '../FormControl';
import { TestForm } from './test.utils';

describe('<CheckBoxGroup />', () => {
   it('renders correctly with options', () => {
      const options = ['Option 1', 'Option 2', 'Option 3'];
      render(
         <TestForm>
            <FormControlBase control="checkboxGroup" name="testGroup" options={options} />
         </TestForm>
      );
      options.forEach((option) => {
         expect(screen.getByText(option)).toBeInTheDocument();
      });
      expect(screen.queryByTestId('action-component')).not.toBeInTheDocument();
   });

   it('displays action components when a checkbox is selected', () => {
      const options = ['Option 1', 'Option 2', 'Option 3'];
      const actionComponents = [
         <div data-testid="action-component-1" key="Action 1">
            Action 1
         </div>,
         <div data-testid="action-component-2" key="Action 1">
            Action 2
         </div>,
         <div data-testid="action-component-3" key="Action 1">
            Action 3
         </div>,
      ];
      render(
         <TestForm>
            <FormControlBase
               control="checkboxGroup"
               name="testGroup"
               options={options}
               actionComp={actionComponents}
            />
         </TestForm>
      );
      // Select a checkbox and check if the corresponding action component is displayed
      fireEvent.click(screen.getByText('Option 2').previousElementSibling as HTMLInputElement);
      expect(screen.getByTestId('action-component-2')).toBeInTheDocument();
   });
});
