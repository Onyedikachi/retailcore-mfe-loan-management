import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Typography } from '@mui/material';
import { FormControlBase } from '@app/components/forms/FormControl';
import { LoanPrincipalControl } from '@app/components/forms/LoanPrincipalControl';
import { PercentageControl } from '@app/components/forms/PercentageControl';
import { Periodicity3, REQUEST_NAMES } from '@app/constants';
import { TenureControl } from '@app/components/forms/TenureControl';
import { useFormikContext } from 'formik';
import { StartDateControl } from '@app/components/forms/StartDateControl';
import { useFormikHelper } from '@app/hooks/useFormikHelper';
import { useBookLoanContext } from '@app/providers/book-loan';
import { useEffect } from 'react';

export const FacilityDetailsFields = () => {
   const { InputFieldNames, TooltipText } = FormMeta;
   const {
      getFieldProps,
      setFieldValue,
      values: facilityDetails,
   } = useFormikContext<FormMeta.FacilityDetailsFormValues>();
   const { resetFieldState } = useFormikHelper();
   const { defaultCurrency } = useBookLoanContext();
   const { updateBookLoanData } = useBookLoanContext();

   useEffect(() => {
      updateBookLoanData('facilityDetails', facilityDetails);
   }, [facilityDetails]);

   return (
      <Box sx={{ width: '95%' }}>
         <FormControlWrapper
            name={InputFieldNames.PRODUCT_NAME}
            label="Loan Product Name"
            required
            layout="horizontal"
            layoutFlexGrid={[5.5, 6.5]}
            tooltipText={TooltipText[InputFieldNames.PRODUCT_NAME]}
         >
            <FormControlBase
               name={InputFieldNames.PRODUCT_NAME}
               control="autocomplete"
               placeholder="Type to search and select"
               noOptionsText="No match"
               onInputChange={() => setFieldValue(InputFieldNames.PRODUCT_CATEGORY, 'Category Name')}
               options={loanProductName}
               search
            />
         </FormControlWrapper>
         <FormControlWrapper
            name={InputFieldNames.PRODUCT_CATEGORY}
            layoutFlexGrid={[5.5, 6.5]}
            label="Loan Product Category"
            required
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.PRODUCT_CATEGORY]}
         >
            <>
               {getFieldProps(InputFieldNames.PRODUCT_NAME)?.value ? (
                  <Typography bgcolor="rgba(170, 170, 170, 0.07)" p={1.2}>
                     Category name
                  </Typography>
               ) : (
                  <Typography variant="body2">Auto-filled from product configuration</Typography>
               )}
            </>
         </FormControlWrapper>
         <FormControlWrapper
            name={InputFieldNames.LOAN_PURPOSE}
            layoutFlexGrid={[5.5, 6.5]}
            label="Loan Purpose"
            required
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.LOAN_PURPOSE]}
         >
            <FormControlBase
               control="input"
               placeholder="Enter purpose"
               name={InputFieldNames.LOAN_PURPOSE}
            />
         </FormControlWrapper>
         <LoanPrincipalControl
            mb={3}
            name={InputFieldNames.PRINCIPAL}
            layout="horizontal"
            label="Principal"
            layoutFlexGrid={[5.5, 6.5]}
            extraLeft={defaultCurrency?.abbreviation ?? 'NGN'}
            placeholder="Enter amount"
            tooltipText={TooltipText[InputFieldNames.PRINCIPAL]}
            //  TODO: Ensure that Principal is not below the min principal or above the max principal
         />
         <PercentageControl
            layout="horizontal"
            label="Interest Rate(% per annum)"
            placeholder="Enter rate"
            tooltipText={TooltipText[InputFieldNames.INTEREST_RATE]}
            name={InputFieldNames.INTEREST_RATE}
            layoutFlexGrid={[5.5, 6.5]}
            withChip
            //TODO: Ensure that interest rate is not below the min rate or above the max rate
         />
         <TenureControl
            layout="horizontal"
            fieldLabel={'Loan Tenor'}
            periodName={InputFieldNames.LOAN_TENURE_PERIOD}
            numberName={InputFieldNames.LOAN_TENURE_NUM}
            layoutFlexGrid={[5.5, 6.5]}
            periodTooltipText={TooltipText[InputFieldNames.LOAN_TENURE_PERIOD]}
            //TODO: Ensure tenor number and period is not below the min or above the max tenor
         />
         <FormControlWrapper
            name={InputFieldNames.REPAYMENT_PATTERN}
            label="Repayment Pattern"
            required
            layout="horizontal"
            layoutFlexGrid={[5.5, 6.5]}
            tooltipText={TooltipText[InputFieldNames.REPAYMENT_PATTERN]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.REPAYMENT_PATTERN}
               placeholder="Select pattern"
               options={FormMeta.repaymentPattern}
            />
         </FormControlWrapper>
         <FormControlWrapper
            name={InputFieldNames.REPAYMENT_FREQUENCY}
            label="Repayment Frequency"
            required
            layout="horizontal"
            layoutFlexGrid={[5.5, 6.5]}
            tooltipText={TooltipText[InputFieldNames.REPAYMENT_FREQUENCY]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.REPAYMENT_FREQUENCY}
               placeholder="Select frequency"
               options={Periodicity3}
               onChange={() => {
                  resetFieldState(InputFieldNames.START_DATE);
                  resetFieldState(InputFieldNames.START_DATE_NUM);
                  resetFieldState(InputFieldNames.START_DATE_PERIOD);
               }}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.REPAYMENT_FREQUENCY)?.value == 'Custom' && (
            <FormControlWrapper
               name={InputFieldNames.START_DATE}
               label="Start Date"
               required
               layout="horizontal"
               layoutFlexGrid={[3, 9]}
               tooltipText={TooltipText[InputFieldNames.START_DATE]}
            >
               <StartDateControl
                  firstName={InputFieldNames.START_DATE}
                  secondName={InputFieldNames.START_DATE_NUM}
                  thirdName={InputFieldNames.START_DATE_PERIOD}
                  thirdPlaceHolder="Select period"
                  bridgeWord="every"
               />
            </FormControlWrapper>
         )}
      </Box>
   );
};

const loanProductName = [
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
];
