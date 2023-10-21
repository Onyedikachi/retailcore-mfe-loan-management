import { CustomerInfoFormValues } from '@app/utils/validators/book-a-loan/customer-info';
import { FacilityDetailsFormValues } from '@app/utils/validators/book-a-loan/facility-details';
import { TransactionSettingsFormValues } from '@app/utils/validators/book-a-loan/transaction-settings';

export interface BookLoanData {
   customerInformation?: CustomerInfoFormValues;
   facilityDetails?: FacilityDetailsFormValues;
   transactionSettings?: TransactionSettingsFormValues;
}
