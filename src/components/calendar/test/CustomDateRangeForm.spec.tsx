import { render, screen, fireEvent } from '@testing-library/react';
import { CustomeDateRangeForm } from '../CustomDateRangeForm';

const mockOnSubmit = jest.fn();

describe('CustomeDateRangeForm', () => {
   it('should render the form and handle date selections', async () => {
      const { container } = render(<CustomeDateRangeForm onSubmit={mockOnSubmit} />);

      const startDateInput = container.querySelector('input[name="startDate"]') as HTMLInputElement;
      const endDateInput = container.querySelector('input[name="endDate"]') as HTMLInputElement;
      fireEvent.change(startDateInput, { target: { value: '2023-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2023-01-15' } });

      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
   });
});
