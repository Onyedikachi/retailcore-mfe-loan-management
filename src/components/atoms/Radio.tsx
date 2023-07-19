import {
   RadioGroupProps as MuiRadioGroupProps,
   FormControl,
   FormControlLabel,
   Radio,
   RadioGroup as MuiRadioGroup,
} from '@mui/material';
import { Field, FieldProps, ErrorMessage } from 'formik';
import { InputErrorText } from '../forms/InputFieldError';

export interface RadioGroupProps extends MuiRadioGroupProps {
   name: string;
   padding?: string;
   options: string[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, ...props }) => {
   return (
      <Field name={props.name}>
         {({ field }: FieldProps) => {
            return (
               <>
                  <FormControl fullWidth>
                     <MuiRadioGroup defaultValue="" row {...props} {...field} id={props.name}>
                        {options.map((option, id) => (
                           <FormControlLabel key={id} value={option} control={<Radio />} label={option} />
                        ))}
                     </MuiRadioGroup>
                     <ErrorMessage
                        name={props.name}
                        children={(error: string) => <InputErrorText errorText={error} />}
                     />
                  </FormControl>
               </>
            );
         }}
      </Field>
   );
};
