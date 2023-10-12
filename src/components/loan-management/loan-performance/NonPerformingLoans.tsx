import { useAppContext } from '@app/providers/app-provider';
import { TableHeaderProps, TableVariant } from '../../table';
import { LoanPerformanceSummary } from './LoanPerformanceWrapper';

export const NonPerformingLoans = () => {
   const { defaultCurrency } = useAppContext();

   return (
      <LoanPerformanceSummary
         tabLabels={['All', 'Individuals', 'SME', 'Cooperate']}
         title="Non-Performing Loans"
         tabPanels={[
            <TableVariant
               key={''}
               headerProps={loans(defaultCurrency?.abbreviation ?? 'NGN')}
               bodyProps={{
                  rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 10].map((item, id) => ({
                     loanProduct: 'Payday Loan',
                     number: '52',
                     value: `${defaultCurrency?.abbreviation ?? 'NGN'} 461.67`,
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
