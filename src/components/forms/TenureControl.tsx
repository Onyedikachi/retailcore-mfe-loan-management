import { Grid, InputAdornment } from '@mui/material';
import FormControlWrapper from './FormControlWrapper';
import { FormControlBase } from './FormControl';
import ValueIncrementDecrement from '../ValueIncreaseDecrease';
import { LoanTenurePeriod } from '@app/constants';

export interface TenureControlProps {
   fieldLabel: string;
   periodName: string;
   periodTooltipText?: string;
   numberName: string;
   loanTenurePeriod?: Array<string>;
   required?: boolean;
   layout?: 'horizontal' | 'vertical' | undefined;
}

export const TenureControl = (props: TenureControlProps) => {
   return (
      <FormControlWrapper
         name={props.periodName}
         label={props.fieldLabel}
         layout={props.layout}
         required={props.required ?? true}
         tooltipText={props.periodTooltipText}
      >
         <Grid container>
            <Grid item xs={4}>
               <FormControlBase
                  sx={{ mr: 2 }}
                  name={props.numberName}
                  allow="number"
                  control="input"
                  placeholder="0"
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <ValueIncrementDecrement fieldName={props.numberName} />
                        </InputAdornment>
                     ),
                  }}
               />
            </Grid>
            <Grid item xs={8}>
               <FormControlBase
                  control="select"
                  name={props.periodName}
                  placeholder="Select period"
                  options={props.loanTenurePeriod ?? LoanTenurePeriod}
               />
            </Grid>
         </Grid>
      </FormControlWrapper>
   );
};
