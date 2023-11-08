import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Typography } from '@mui/material';
import { FormControlBase } from '@app/components/forms/FormControl';
import { LoanPrincipalControl } from '@app/components/forms/LoanPrincipalControl';
import { PercentageControl } from '@app/components/forms/PercentageControl';
import { API_PATH, PeriodWithCustom } from '@app/constants';
import { TenureControl } from '@app/components/forms/TenureControl';
import { useFormikContext } from 'formik';
import { StartDateControl } from '@app/components/forms/StartDateControl';
import { useFormikHelper } from '@app/hooks/useFormikHelper';
import { useBookLoanContext } from '@app/providers/book-loan';
import { useEffect, useState } from 'react';
import { useRequest } from 'react-http-query';

export const FacilityDetailsFields: React.FC<{ getSearchInput?: (input: string) => void }> = (props) => {
   const { InputFieldNames, TooltipText } = FormMeta;
   const { getFieldProps, validate, values } = useFormikContext<FormMeta.FacilityDetailsFormValues>();
   const { resetFieldState } = useFormikHelper();
   const { productNames, getSelectedProduct, selectedProduct, getInputtedPrincipal } = useBookLoanContext();
   const [loanProductId, setLoanProductId] = useState<string>();
   const hasSelectedProduct = getFieldProps(InputFieldNames.PRODUCT_NAME)?.value;

   const [, getProductDetail] = useRequest({ onSuccess: (res) => getSelectedProduct(res.data.data) });
   useEffect(() => {
      loanProductId &&
         getProductDetail(`${API_PATH.GetAllLoanProduct}/${loanProductId}`, { showSuccess: false });
   }, [loanProductId]);

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
               onInputChange={(value) => {
                  validate?.(values);
                  setLoanProductId(productNames?.filter((prod) => prod.name == value)[0]?.id);
               }}
               options={productNames?.map((prod) => prod.name) ?? []}
               filterOptions={(option, { inputValue }) => {
                  props?.getSearchInput?.(inputValue);
                  return productNames?.map((prod) => prod.name) ?? [];
               }}
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
               {hasSelectedProduct ? (
                  <Typography bgcolor="rgba(170, 170, 170, 0.07)" p={1.2}>
                     {selectedProduct?.category}
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
               disabled={!hasSelectedProduct}
            />
         </FormControlWrapper>
         <LoanPrincipalControl
            mb={3}
            name={InputFieldNames.PRINCIPAL}
            layout="horizontal"
            label="Principal"
            onChange={(e) => getInputtedPrincipal(e.target.value)}
            layoutFlexGrid={[5.5, 6.5]}
            extraLeft={selectedProduct?.currency ?? ''}
            placeholder="Enter amount"
            tooltipText={TooltipText[InputFieldNames.PRINCIPAL]}
            disabled={!hasSelectedProduct}
         />
         <PercentageControl
            layout="horizontal"
            label="Interest Rate(% per annum)"
            placeholder="Enter rate"
            tooltipText={TooltipText[InputFieldNames.INTEREST_RATE]}
            name={InputFieldNames.INTEREST_RATE}
            layoutFlexGrid={[5.5, 6.5]}
            withChip
            disabled={!hasSelectedProduct}
         />
         <TenureControl
            layout="horizontal"
            fieldLabel={'Loan Tenor'}
            periodName={InputFieldNames.LOAN_TENURE_PERIOD}
            numberName={InputFieldNames.LOAN_TENURE_NUM}
            layoutFlexGrid={[5.5, 6.5]}
            periodTooltipText={TooltipText[InputFieldNames.LOAN_TENURE_PERIOD]}
            disabled={!hasSelectedProduct}
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
               disabled={!hasSelectedProduct}
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
               options={PeriodWithCustom}
               onChange={() => {
                  resetFieldState(InputFieldNames.START_DATE);
                  resetFieldState(InputFieldNames.START_DATE_NUM);
                  resetFieldState(InputFieldNames.START_DATE_PERIOD);
               }}
               disabled={!hasSelectedProduct}
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
