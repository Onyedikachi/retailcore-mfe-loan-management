import { render, screen, fireEvent } from '@testing-library/react';
import { DateFilter } from '../DateFilter'; // Replace with the correct import path

describe('DateFilter', () => {
   it('should open the menu and render DateRange component', async () => {
      render(<DateFilter />);

      const filterButton = screen.getByRole('button');
      fireEvent.click(filterButton);

      const dateRangeComponent = screen.getByText('Last 30 days');

      expect(dateRangeComponent).toBeInTheDocument();
   });
});
