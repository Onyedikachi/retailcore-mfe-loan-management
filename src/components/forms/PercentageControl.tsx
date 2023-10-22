import { InputAdornment } from '@mui/material';
import { InputChip } from '../atoms';
import { FormControlBase } from './FormControl';
import FormControlWrapper, { WrapperProps } from './FormControlWrapper';

export interface PercentageControlProps extends Omit<WrapperProps, 'children'> {
   name: string;
   required?: boolean;
   placeholder?: string;
   withChip?: boolean;
   disabled?: boolean;
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
         layoutFlexGrid={props.layoutFlexGrid}
      >
         <FormControlBase
            name={props.name}
            control="input"
            ratio
            disabled={props?.disabled}
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
