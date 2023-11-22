import { BookedLoanData } from '@app/@types/loan-product';
import FilterMenu from '@app/components/atoms/FilterMenu';
import { DateFilter } from '@app/components/calendar/DateFilter';
import { TableHeaderProps } from '@app/components/table';
import { tabCardOptions } from '@app/constants/dashboard';

export const headerData = (
   loanProducts: BookedLoanData[] | undefined,
   filterType: (selectedOptions: string[]) => void,
   filterReviewer: (selectedOptions: string[]) => void,
   filterStatus: (selectedOptions: string[]) => void,
   filterDate: (startDate?: Date | undefined, endDate?: Date | undefined, staticRange?: string) => void,
   isUserAChecker: boolean,
   tab: string
): TableHeaderProps => {
   const statusOptions = tabCardOptions(undefined, isUserAChecker)
      [tab]?.map((option) => option.label)
      .slice(1);

   const uniqueReviewer = new Set();
   loanProducts?.forEach((loan) => {
      if (loan?.loanActivities?.length > 0 && loan?.loanActivities[0]?.createdBy) {
         uniqueReviewer.add(loan?.loanActivities[0]?.createdBy);
      }
   });
   const reviewer = Array.from(uniqueReviewer) as string[];

   return {
      data: [
         { key: 'request', element: 'REQUEST' },
         {
            key: 'type',
            element: 'TYPE',
            rightIcon: (
               <FilterMenu
                  options={['Booking', 'Restructuring']}
                  onFilterChange={(value) => filterType(value as string[])}
               />
            ),
         },
         {
            key: 'reviewer',
            element: 'REVIEWER',
            rightIcon: (
               <FilterMenu
                  options={reviewer ?? []}
                  onFilterChange={(value) => filterReviewer(value as string[])}
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
