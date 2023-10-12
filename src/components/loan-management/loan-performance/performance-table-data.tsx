import FilterMenu from '@app/components/atoms/FilterMenu';
import { DateFilter } from '@app/components/calendar/DateFilter';
import { TableHeaderProps } from '@app/components/table';
import { Typography, Chip } from '@mui/material';

export const performanceHeaderData = (
   filterIntiator: (selectedOptions: string) => void,
   filterPerformance: (selectedOptions: string) => void,
   filterDate: (startDate?: Date | undefined, endDate?: Date | undefined) => void,
   type: string | null
): TableHeaderProps => {
   return {
      data: [
         { key: 'customerName', element: 'CUSTOMER NAME/ID' },
         { key: 'loanAmount', element: 'LOAN AMOUNT' },
         {
            key: 'initiator',
            element: 'INITIATOR',
            rightIcon: (
               <FilterMenu
                  checkbox={false}
                  options={['Me', 'My branch', 'System Wide']}
                  onFilterChange={(value) => filterIntiator(value as string)}
               />
            ),
         },
         {
            key: 'performance',
            element: 'PERFORMANCE',
            rightIcon: (
               <FilterMenu
                  checkbox={false}
                  options={['All Loans', 'Performing Loans', 'Non-Performing Loans']}
                  onFilterChange={(value) => filterPerformance(value as string)}
               />
            ),
         },
         { key: 'status', element: 'STATUS' },
         {
            key: 'updatedOn',
            element: 'UPDATED ON',
            rightIcon: <DateFilter onDateRangeChange={filterDate} />,
         },
      ],
   };
};

export const performanceBodyData = (currency: string, type: string | null) => {
   const status = 'Active';
   return {
      customerName: (
         <>
            <Typography fontSize="14px"> Omolola Olusanya</Typography>
            <Typography variant="caption"> 0123456789</Typography>
         </>
      ),
      loanAmount: `${currency} 10,000.00`,
      initiator: 'Me',
      performance: <Chip sx={{ p: 0, borderRadius: '4px', height: '25px', ...colors.plain }} label={type} />,
      status: (
         <Chip sx={{ p: 0, borderRadius: '4px', height: '25px', ...statusColors(status) }} label={status} />
      ),
      updatedOn: '19 Feb 2022, 10:22 AM',
   };
};

const colors = {
   plain: { color: '#1E0A3C', bgcolor: '#E5E5EA' },
   active: { color: '#15692A', bgcolor: '#D4F7DC' },
   watchList: { color: '#0050C8', bgcolor: '#F0F5FF' },
   substandard: { color: '#806B00', bgcolor: '#FFF8CC' },
   doubtful: { color: '#804C00', bgcolor: '#FFEBCC' },
   lost: { color: '#9F1F17', bgcolor: '#FFD4D2' },
};

const statusColors = (status: string) => {
   switch (status) {
      case 'Active':
         return colors.active;
      case 'Watchlist':
         return colors.active;
      case 'Substandard':
         return colors.active;
      case 'Doubtful':
         return colors.active;
      case 'Lost':
         return colors.active;
      default:
         return colors.plain;
   }
};
