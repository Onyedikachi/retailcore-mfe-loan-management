import { Grid } from '@mui/material';
import { LoanPrincipalControl } from './LoanPrincipalControl';
import { CommonFormFieldNames, CommonTooltipText } from '@app/constants';

export interface LoanPrincipalControlProps {
   maxName?: string;
   maxLabel?: string;
   minName?: string;
   minLabel?: string;
   required?: boolean;
   maxTooltipText?: string;
   minTooltipText?: string;
}

export const LoanPrincipalRangeControl = (props: LoanPrincipalControlProps) => {
   return (
      <>
         <Grid item xs={4} pr={6}>
            <LoanPrincipalControl
               name={props.minName ?? CommonFormFieldNames.MIN_LOAN_PRINCIPAL}
               label={props.minLabel ?? 'Minimum Loan Principal'}
               required={props.required}
               tooltipText={props.minTooltipText ?? CommonTooltipText.MIN_LOAN_PRINCIPAL}
            />
         </Grid>
         <Grid item xs={4} pr={6}>
            <LoanPrincipalControl
               name={props.maxName ?? CommonFormFieldNames.MAX_LOAN_PRINCIPAL}
               label={props.maxLabel ?? 'Maximum Loan Principal'}
               required={props.required}
               tooltipText={props.maxTooltipText ?? CommonTooltipText.MAX_LOAN_PRINCIPAL}
            />
         </Grid>
      </>
   );
};
