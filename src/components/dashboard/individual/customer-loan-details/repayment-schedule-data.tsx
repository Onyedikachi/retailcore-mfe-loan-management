import { DateFilter } from '@app/components/calendar/DateFilter';
import { StyledChip } from '@app/components/loan-management/loan-performance/table-data/performance-body-data';
import { TableHeaderProps } from '@app/components/table';
import { statusColors } from '@app/constants/colors';
import { formattedDate } from '@app/helper/formater';

export const repayementScheduleHeaderData = (
   filterDate: (startDate?: Date | undefined, endDate?: Date | undefined) => void
): TableHeaderProps => {
   return {
      data: [
         { key: 'date', element: 'DATE', rightIcon: <DateFilter onDateRangeChange={filterDate} /> },
         { key: 'principal', element: 'PRINCIPAL' },
         { key: 'interest', element: 'INTEREST' },
         { key: 'amountPayable', element: 'AMOUNT PAYABLE' },
         { key: 'outStandingBalance', element: 'OUTSTANDING BALANCE' },
         { key: 'status', element: 'STATUS' },
      ],
   };
};

export const repaymentScheduleBodyData = (currency: string) => {
   const status = 'Settled';
   return {
      date: formattedDate(new Date()),
      principal: `${currency} 10,000.00`,
      interest: `${currency} 10,000.00`,
      amountPayable: `${currency} 10,000.00`,
      outStandingBalance: `${currency} 10,000.00`,
      status: <StyledChip sx={{ height: '25px', ...statusColors(status) }} label={status} />,
   };
};
