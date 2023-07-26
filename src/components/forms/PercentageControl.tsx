import { InputAdornment } from '@mui/material';
import { InputChip } from '../atoms';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';

export interface PercentageControlProps {
   name: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
   withChip?: boolean;
}

export const PercentageControlControl = (props: PercentageControlProps) => {
   return (
      <FormControlWrapper
         name={props.name}
         label={props.label}
         required={props.required ?? true}
         tooltipText={props.tooltipText}
      >
         <FormControlBase
            name={props.name}
            control="input"
            ratio
            placeholder={props.placeholder ?? '0'}
            InputProps={{
               ...(props.withChip && {
                  endAdornment: (
                     <InputAdornment position="end">
                        <InputChip label="Percent" />
                     </InputAdornment>
                  ),
               }),
            }}
         />
      </FormControlWrapper>
   );
};
