import { FacilityDetailsFormValues } from '@app/utils/validators/book-a-loan/facility-details';
import { InputFieldNames as Fields } from '@app/utils/validators/book-a-loan/facility-details';
import { useBookLoanContext } from '@app/providers/book-loan';
import { GridComponent } from './GridComponent';

export const LoanManagementSummary = () => {
   const {
      bookLoanData: { facilityDetails: summary },
   } = useBookLoanContext();
   return (
      <>
         {details(summary)?.map((props) => {
            return props?.value && <GridComponent property={props?.key} value={props?.value} />;
         })}
      </>
   );
};

const details = (summary?: FacilityDetailsFormValues) => [
   {
      key: 'Moratorium Period',
      value: `${summary?.[Fields.MORATORIUM_PERIOD_VALUE]} ${summary?.[Fields.MORATORIUM_PERIOD]}`,
   },
   { key: 'Duration', value: summary?.[Fields.RECOGNISE_MORATORIUM_PERIOD] },
   {
      key: 'Grace Period',
      value: `${summary?.[Fields.GRACE_PERIOD_VALUE]} ${summary?.[Fields.GRACE_PERIOD]}`,
   },
];
