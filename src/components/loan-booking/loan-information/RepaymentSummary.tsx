import { useBookLoanContext } from '@app/providers/book-loan';
import {
   TransactionSettingsFormValues,
   InputFieldNames as Fields,
} from '@app/utils/validators/book-a-loan/transaction-settings';
import { GridComponent } from './GridComponent';

export const RepaymentSummary = () => {
   const {
      bookLoanData: { transactionSettings: summary },
   } = useBookLoanContext();

   return (
      <>
         {details(summary)?.map((props) => {
            return props?.value && <GridComponent property={props?.key} value={props?.value} />;
         })}
      </>
   );
};

const details = (summary?: TransactionSettingsFormValues) => [
   { key: 'Repayment Channel', value: summary?.[Fields.REPAYMENT_CHANNEL] },
   { key: 'Repayment Account', value: summary?.[Fields.REPAYMENT_ACCOUNT] },
];
