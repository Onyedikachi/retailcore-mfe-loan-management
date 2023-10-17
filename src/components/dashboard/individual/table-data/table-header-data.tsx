import FilterMenu from '@app/components/atoms/FilterMenu';
import { DateFilter } from '@app/components/calendar/DateFilter';
import { TableHeaderProps } from '@app/components/table';
import { tabCardOptions } from '@app/constants/dashboard';

export const headerData = (
   filterLoanProduct: (selectedOptions: string[]) => void,
   filterStatus: (selectedOptions: string[]) => void,
   filterDate: (startDate?: Date | undefined, endDate?: Date | undefined) => void,
   tab: string
): TableHeaderProps => {
   const statusOptions = tabCardOptions[tab]?.map((option) => option.label);
   return {
      data: [
         { key: 'customerName', element: 'CUSTOMER NAME/ID' },
         { key: 'loanAmount', element: 'LOAN AMOUNT' },
         {
            key: 'loanProduct',
            element: 'LOAN PRODUCT',
            rightIcon: (
               <FilterMenu
                  options={['PayDay Loan', 'School Fees Loan', 'System Wide']}
                  onFilterChange={(value) => filterLoanProduct(value as string[])}
               />
            ),
         },
         {
            key: 'status',
            element: 'STATUS',
            rightIcon: (
               <FilterMenu
                  options={statusOptions}
                  onFilterChange={(value) => filterStatus(value as string[])}
               />
            ),
         },
         {
            key: 'updatedOn',
            element: 'UPDATED ON',
            rightIcon: <DateFilter onDateRangeChange={filterDate} />,
         },
         { key: 'filter', element: '' },
      ],
   };
};
