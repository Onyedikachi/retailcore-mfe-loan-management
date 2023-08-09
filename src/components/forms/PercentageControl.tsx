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
   layout?: 'horizontal' | 'vertical' | undefined;
   labelDescription?: string;
}

export const PercentageControl = (props: PercentageControlProps) => {
   return (
      <FormControlWrapper
         labelDescription={props.labelDescription}
         name={props.name}
         label={props.label}
         layout={props.layout}
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
