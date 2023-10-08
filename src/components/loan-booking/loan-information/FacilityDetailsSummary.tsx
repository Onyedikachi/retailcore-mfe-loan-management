import { Currency } from '@app/@types';
import { useBookLoanContext } from '@app/providers/book-loan';
import { FacilityDetailsFormValues } from '@app/utils/validators/book-a-loan/facility-details';
import { InputFieldNames as Fields } from '@app/utils/validators/book-a-loan/facility-details';
import { GridComponent } from './GridComponent';

export const FacilityDetailsSummary = () => {
   const { defaultCurrency } = useBookLoanContext();
   const {
      bookLoanData: { facilityDetails: summary },
   } = useBookLoanContext();

   return (
      <>
         {details(summary, defaultCurrency)?.map((props) => {
            return props?.value && <GridComponent property={props?.key} value={props?.value} />;
         })}
      </>
   );
};

const details = (summary?: FacilityDetailsFormValues, defaultCurrency?: Currency) => [
   { key: 'Currency', value: defaultCurrency?.abbreviation ?? 'NGN' },
   { key: 'Principal', value: summary?.[Fields.PRINCIPAL] },
   { key: 'Interest rate', value: summary?.[Fields.INTEREST_RATE] },
   {
      key: 'Loan Tenor',
      value: `${summary?.[Fields.LOAN_TENURE_NUM]} ${summary?.[Fields.LOAN_TENURE_PERIOD]}`,
   },
   { key: 'Repayment Pattern', value: summary?.[Fields.REPAYMENT_PATTERN] },
   {
      key: 'Repayment Frequency',
      value:
         summary?.[Fields.REPAYMENT_FREQUENCY] != 'Custom'
            ? summary?.[Fields.REPAYMENT_FREQUENCY]
            : `${summary?.[Fields.START_DATE_NUM]} ${summary?.[Fields.START_DATE_PERIOD]}`,
   },
   summary?.[Fields.REPAYMENT_FREQUENCY] == 'Custom'
      ? { key: 'Repayment Start Date', value: summary?.[Fields.START_DATE] }
      : undefined,
];
