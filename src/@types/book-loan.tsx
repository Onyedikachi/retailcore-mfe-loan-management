import { CustomerInfoFormValues } from '@app/utils/validators/book-a-loan/customer-info';
import { FacilityDetailsFormValues } from '@app/utils/validators/book-a-loan/facility-details';
import { TransactionSettingsFormValues } from '@app/utils/validators/book-a-loan/transaction-settings';

type ExtendedFacilityDetails = FacilityDetailsFormValues & {
   productId?: string;
};
export interface BookLoanData {
   customerInformation?: CustomerInfoFormValues;
   facilityDetails?: ExtendedFacilityDetails;
   transactionSettings?: TransactionSettingsFormValues;
}
export type BookLoanDataType =
   | CustomerInfoFormValues
   | TransactionSettingsFormValues
   | ExtendedFacilityDetails;
