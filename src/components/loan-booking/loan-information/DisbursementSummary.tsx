import { useBookLoanContext } from '@app/providers/book-loan';
import {
   TransactionSettingsFormValues,
   InputFieldNames as Fields,
} from '@app/utils/validators/book-a-loan/transaction-settings';
import { GridComponent } from './GridComponent';

export const DisbursementSummary = () => {
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
   { key: 'Disbursement Method', value: summary?.[Fields.DISBURSEMENT_METHOD] },
   { key: 'Disbursement Date', value: summary?.[Fields.DISBURSEMENT_DATE] },
   { key: 'Disbursement Account', value: summary?.[Fields.DISBURSEMENT_ACCOUNT] },
   { key: 'Other Account No', value: summary?.[Fields.OTHER_ACCOUNT_NO] },
   { key: 'Notification channel', value: summary?.[Fields.NOTIFICATION_CHANNEL].toString() },
];
