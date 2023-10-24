import { fireEvent, screen } from '@testing-library/react';
import { Filters } from '../DashboardTab';
import { tabCardOptions } from '@app/constants/dashboard';
import { renderWithThemeProvider } from '@app/components/atoms/test/test.utils';
import { MemoryRouter } from 'react-router-dom';

describe('Filters Component', () => {
   const statusOptions = tabCardOptions()['results'];

   const tabOptions = [
      { label: 'Tab1', key: 'Tab1' },
      { label: 'Tab2', key: 'Tab2' },
   ];

   it('renders with default values', () => {
      renderWithThemeProvider(
         <MemoryRouter>
            <Filters
               statusOptions={statusOptions}
               tabOptions={tabOptions}
               onTabClick={() => {}}
               onStatusClick={() => {}}
               onFilterOptionSelected={() => {}}
               tabKey={'results'}
            />
         </MemoryRouter>
      );

      expect(screen.getByText('Tab1')).toBeInTheDocument();
      expect(screen.getByText('Tab2')).toBeInTheDocument();
   });

   it('handles tab change', () => {
      const onTabClick = jest.fn();
      renderWithThemeProvider(
         <MemoryRouter>
            <Filters
               statusOptions={statusOptions}
               tabOptions={tabOptions}
               onTabClick={onTabClick}
               onStatusClick={() => {}}
               onFilterOptionSelected={() => {}}
               tabKey={''}
            />
         </MemoryRouter>
      );

      const tab2Button = screen.getByText('Tab2');
      fireEvent.click(tab2Button);

      expect(onTabClick).toHaveBeenCalledWith('Tab2');
   });
});
