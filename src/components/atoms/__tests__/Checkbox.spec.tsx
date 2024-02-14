import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox, { CheckboxProps } from '../Checkbox';

describe('Checkbox component', () => {
   const defaultProps: CheckboxProps = {
      label: 'Test Checkbox',
   };

   test('renders checkbox with label', () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByLabelText('Test Checkbox');
      expect(checkbox).toBeInTheDocument();
   });

   test('checkbox is initially unchecked', () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
   });

   test('checkbox toggles when clicked', async () => {
      render(<Checkbox {...defaultProps} />);
      const checkbox = screen.getByLabelText('Test Checkbox');
      userEvent.click(checkbox);

      // Wait for the next tick to allow the checkbox to update its state
      await waitFor(() => {
         expect(checkbox).toBeChecked();
      });

      userEvent.click(checkbox);

      await waitFor(() => {
         expect(checkbox).not.toBeChecked();
      });
   });

   test('checkbox displays label text', () => {
      render(<Checkbox {...defaultProps} />);
      const label = screen.getByText('Test Checkbox');
      expect(label).toBeInTheDocument();
   });

   test('checkbox can be disabled', () => {
      render(<Checkbox {...defaultProps} disabled />);
      const checkbox = screen.getByLabelText('Test Checkbox') as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
   });
});
