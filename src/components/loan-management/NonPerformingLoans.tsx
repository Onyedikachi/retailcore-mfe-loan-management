import { useRequestData } from 'react-http-query';
import { TableHeaderProps, TableVariant } from '../table';
import { LoanPerformanceSummary } from './LoanPerformanceSummary';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { CurrencyListResponse } from '@app/@types';
import { REQUEST_NAMES } from '@app/constants';

export const NonPerformingLoans = () => {
   const currencies = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);
   const currency = getDefaultCurrency(currencies)?.abbreviation ?? 'NGN';
   return (
      <LoanPerformanceSummary
         tabLabels={['All', 'Individuals', 'SME', 'Cooperate']}
         title="Non Performing Loans"
         tabPanels={[
            <TableVariant
               headerProps={loans(currency)}
               bodyProps={{
                  rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 10].map((item, id) => ({
                     loanProduct: 'Payday Loan',
                     number: '52',
                     value: `${currency} 461.67`,
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
