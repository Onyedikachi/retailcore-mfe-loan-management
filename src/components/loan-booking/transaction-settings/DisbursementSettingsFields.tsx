import * as FormMeta from '@app/utils/validators/book-a-loan/transaction-settings';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box } from '@mui/material';
import { FormControlBase } from '@app/components/forms/FormControl';
import { useFormikContext } from 'formik';
import { useFormikHelper } from '@app/hooks/useFormikHelper';
import { useBookLoanContext, AccountNumber } from '@app/providers/book-loan';
import { useRequest } from 'react-http-query';
import { useEffect, useState } from 'react';
import { CUSTOMER_MANAGEMENT_PATH } from '@app/constants';
import { AutocompleteOptions } from '@app/components/atoms';

export const DisbursementSettingsFields = () => {
   const { InputFieldNames, TooltipText, disbursementMethods, disbursementAccounts } = FormMeta;
   const { getFieldProps } = useFormikContext<FormMeta.TransactionSettingsFormValues>();
   const { GET_INDIVIDUAL_ACCOUNTS } = CUSTOMER_MANAGEMENT_PATH;
   const { accountNumbers, getCustomersData } = useBookLoanContext();
   const [searchInput, setSearchInput] = useState('');
   const { resetFieldState } = useFormikHelper();

   const [, fetchCustomers] = useRequest({
      onSuccess: (response) => getCustomersData(response?.data?.data?.accounts),
   });
   useEffect(() => {
      fetchCustomers(GET_INDIVIDUAL_ACCOUNTS, {
         showSuccess: false,
         showLoader: !accountNumbers,
         query: { size: 20, search: searchInput },
      });
   }, [searchInput]);

   return (
      <Box width="90%" py={2}>
         <FormControlWrapper
            name={InputFieldNames.DISBURSEMENT_METHOD}
            label="Disbursement Method"
            layout="horizontal"
            layoutFlexGrid={[6, 6]}
            tooltipText={TooltipText[InputFieldNames.DISBURSEMENT_METHOD]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.DISBURSEMENT_METHOD}
               placeholder="Select"
               onChange={() => resetFieldState(InputFieldNames.DISBURSEMENT_DATE)}
               options={disbursementMethods}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.DISBURSEMENT_METHOD)?.value == disbursementMethods[1] && (
            <FormControlWrapper
               name={InputFieldNames.DISBURSEMENT_DATE}
               label="Date of disbursement"
               layout="horizontal"
               layoutFlexGrid={[6, 6]}
               tooltipText={TooltipText[InputFieldNames.DISBURSEMENT_DATE]}
            >
               <FormControlBase
                  control="date"
                  placeholder="Select date"
                  minDate={new Date()}
                  name={InputFieldNames.DISBURSEMENT_DATE}
               />
            </FormControlWrapper>
         )}
         <FormControlWrapper
            name={InputFieldNames.DISBURSEMENT_ACCOUNT}
            label="Disbursement Account"
            layout="horizontal"
            layoutFlexGrid={[6, 6]}
            tooltipText={TooltipText[InputFieldNames.DISBURSEMENT_ACCOUNT]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.DISBURSEMENT_ACCOUNT}
               onChange={() => resetFieldState(InputFieldNames.OTHER_ACCOUNT_NO)}
               placeholder="Select"
               options={disbursementAccounts}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.DISBURSEMENT_ACCOUNT)?.value == disbursementAccounts[2] && (
            <FormControlWrapper
               name={InputFieldNames.OTHER_ACCOUNT_NO}
               label="Other Account Number"
               layout="horizontal"
               layoutFlexGrid={[6, 6]}
               tooltipText={TooltipText[InputFieldNames.OTHER_ACCOUNT_NO]}
            >
               <FormControlBase
                  control="autocomplete"
                  placeholder="Type to search"
                  name={InputFieldNames.OTHER_ACCOUNT_NO}
                  noOptionsText="No match"
                  options={accountNumbers ?? []}
                  onInputChange={(value) => (value as AccountNumber)?.customerId}
                  filterOptions={(option, { inputValue }) => {
                     setSearchInput(inputValue?.toLowerCase());
                     return (accountNumbers as AutocompleteOptions[]) ?? [];
                  }}
                  search
               />
            </FormControlWrapper>
         )}
         <FormControlWrapper
            name={InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION}
            label="Enable Disbursement Notification"
            layout="horizontal"
            layoutFlexGrid={[6, 6]}
            tooltipText={TooltipText[InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION]}
         >
            <FormControlBase
               control="switch"
               onChange={() => resetFieldState(InputFieldNames.NOTIFICATION_CHANNEL)}
               name={InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION)?.value && (
            <FormControlWrapper
               name={InputFieldNames.NOTIFICATION_CHANNEL}
               label="Notification Channels"
               tooltipText={TooltipText[InputFieldNames.NOTIFICATION_CHANNEL]}
            >
               <FormControlBase
                  sx={{ ml: 1 }}
                  control="checkboxGroup"
                  name={InputFieldNames.NOTIFICATION_CHANNEL}
                  options={['Email']}
               />
            </FormControlWrapper>
         )}
      </Box>
   );
};
