import { render, screen, fireEvent } from '@testing-library/react';
import { DateRange } from '../DateRange';

const mockOnStaticRangeSelected = jest.fn();
const mockOnDateRangeChange = jest.fn();
const mockOnClickReset = jest.fn();

describe('DateRange', () => {
   it('should render the component and handle date selections', async () => {
      render(
         <DateRange
            onStaticRangeSelected={mockOnStaticRangeSelected}
            onDateRangeChange={mockOnDateRangeChange}
            onClickReset={mockOnClickReset}
         />
      );

      const staticRangeLabel = 'Last 7 days';
      const staticRangeButton = screen.getByText(staticRangeLabel);
      fireEvent.click(staticRangeButton);

      expect(mockOnStaticRangeSelected).toHaveBeenCalledWith(staticRangeLabel, expect.any(Object));

      const customRangeLabel = 'Custom';
      const customRangeButton = screen.getByText(customRangeLabel);
      fireEvent.click(customRangeButton);

      expect(screen.getByText('Start Date')).toBeInTheDocument();
      expect(screen.getByText('End Date')).toBeInTheDocument();
   });
});
