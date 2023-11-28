import { TableHeaderProps, TableVariant } from '../../table';
import { LoanPerformanceSummary } from './LoanPerformanceWrapper';
import { useAppContext } from '@app/providers/app-provider';

export const PerformingLoans = () => {
   const { defaultCurrency: currency } = useAppContext();

   return (
      <LoanPerformanceSummary
         tabLabels={['All', 'Individuals', 'SME', 'Cooperate']}
         title="Performing Loans"
         tabPanels={[
            <TableVariant
               key={''}
               headerProps={loans(currency?.abbreviation ?? 'NGN')}
               bodyProps={{
                  rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 10].map((item, id) => ({
                     loanProduct: 'Payday Loan',
                     number: '52',
                     value: `${currency?.abbreviation ?? 'NGN'} 461.67`,
                  })),
               }}
            />,
         ]}
      />
   );
};

const loans = (currency: string): TableHeaderProps => {
   return {
      data: [
         { key: 'loanProduct', element: 'Loan Product' },
         { key: 'number', element: 'Number' },
         { key: 'value', element: `Value(${currency})` },
      ],
   };
};
