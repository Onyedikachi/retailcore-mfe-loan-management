import { useFormikContext } from 'formik';
import * as FormMeta from '@app/utils/validators/book-a-loan/transaction-settings';
import { CustomAccountEntryField } from './custom-account-entry';

export const AccountEnteriesFields = () => {
   const { getFieldProps } = useFormikContext();

   const { InputFieldNames } = FormMeta;
   return (
      <>
         <CustomAccountEntryField
            label="Disbursement"
            debitLedgername={InputFieldNames.DISBURSEMENT_DEBIT_LEDGER}
            creditLedgername={InputFieldNames.DISBURSEMENT_CREDIT_LEDGER}
            onClickActionButtonDebit={() => {}}
            onClickActionButtonCredit={() => {}}
         />
         <CustomAccountEntryField
            label="Principal repayment"
            debitLedgername={InputFieldNames.PRINCIPAL_REPAYMENT_DEBIT_LEDGER}
            creditLedgername={InputFieldNames.PRINCIPAL_REPAYMENT_DEBIT_LEDGER}
            onClickActionButtonDebit={() => {}}
            onClickActionButtonCredit={() => {}}
         />
         <CustomAccountEntryField
            label="Interest repayment"
            debitLedgername={InputFieldNames.INTEREST_REPAYMENT_DEBIT_LEDGER}
            creditLedgername={InputFieldNames.INTEREST_REPAYMENT_CREDIT_LEDGER}
            onClickActionButtonDebit={() => {}}
            onClickActionButtonCredit={() => {}}
         />
         <CustomAccountEntryField
            label="Interest accrual"
            debitLedgername={InputFieldNames.INTEREST_ACCRUED_DEBIT_LEDGER}
            creditLedgername={InputFieldNames.INTEREST_ACCRUED_CREDIT_LEDGER}
            onClickActionButtonDebit={() => {}}
            onClickActionButtonCredit={() => {}}
         />
         <CustomAccountEntryField
            label="Penalties"
            debitLedgername={InputFieldNames.PENALTIES_DEBIT_LEDGER}
            creditLedgername={InputFieldNames.PENALTIES_CREDIT_LEDGER}
            onClickActionButtonDebit={() => {}}
            onClickActionButtonCredit={() => {}}
         />
      </>
   );
};
