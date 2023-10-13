import FilterMenu from '@app/components/atoms/FilterMenu';
import { DateFilter } from '@app/components/calendar/DateFilter';
import { TableHeaderProps } from '@app/components/table';

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

