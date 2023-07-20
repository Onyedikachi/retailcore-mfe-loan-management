import { InputAdornment } from '@mui/material';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import ValueIncrementDecrement from '../value-increase-decrease';

export interface CounterControlProps {
   name: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
   formik: any;
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
            placeholder={props.placeholder ?? '0'}
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <ValueIncrementDecrement formik={props.formik} fieldName={props.name} />
                  </InputAdornment>
               ),
            }}
         />
      </FormControlWrapper>
   );
};
