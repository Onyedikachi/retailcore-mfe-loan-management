import { InputAdornment } from '@mui/material';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import ValueIncrementDecrement from '../ValueIncreaseDecrease';

export interface CounterControlProps {
   name: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
   defaultValue?: any;
}

export const CounterControl = (props: CounterControlProps) => {
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
            allow="number"
            defaultValue={props.defaultValue}
            placeholder={props.placeholder ?? '0'}
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <ValueIncrementDecrement fieldName={props.name} />
                  </InputAdornment>
               ),
            }}
         />
      </FormControlWrapper>
   );
};
