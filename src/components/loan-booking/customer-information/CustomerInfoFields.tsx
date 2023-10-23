import * as FormMeta from '@app/utils/validators/book-a-loan/customer-info';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Divider } from '@mui/material';
import { AutocompleteOptions } from '@app/components/atoms';
import { CustomerAccountInformation } from './CustomerAccountInfo';
import { FormControlBase } from '@app/components/forms/FormControl';
import { AccountNumber, useBookLoanContext } from '@app/providers/book-loan';

export const CustomerInfoFields: React.FC<{ getSearchInput?: (input: string) => void }> = (props) => {
   const { InputFieldNames, TooltipText } = FormMeta;
   const { getSelectedCustomer, accountNumbers, selectedCustomer } = useBookLoanContext();

   //   const { getFieldProps } = useFormikContext<FormMeta.CustomerInfoFormValues>();
   //   const isCustomerSelected = getFieldProps(InputFieldNames.CUSTOMER_ACCOUNT_NO)?.value;

   return (
      <>
         <Box sx={{ mb: 6 }}>
            <FormControlWrapper
               sx={{ width: '25%', mb: 5 }}
               name={InputFieldNames.CUSTOMER_ACCOUNT_NO}
               label="Customer's Account Number"
               required
               tooltipText={TooltipText[InputFieldNames.CUSTOMER_ACCOUNT_NO]}
            >
               <FormControlBase
                  control="autocomplete"
                  placeholder="Type to search"
                  name={InputFieldNames.CUSTOMER_ACCOUNT_NO}
                  noOptionsText="No match"
                  options={accountNumbers ?? []}
                  onInputChange={(value) => getSelectedCustomer((value as AccountNumber)?.customerId)}
                  filterOptions={(option, { inputValue }) => {
                     props?.getSearchInput?.(inputValue?.toLowerCase());
                     return (accountNumbers as AutocompleteOptions[]) ?? [];
                  }}
                  search
               />
            </FormControlWrapper>
            {selectedCustomer && <CustomerAccountInformation />}
         </Box>
         <Divider />
      </>
   );
};
