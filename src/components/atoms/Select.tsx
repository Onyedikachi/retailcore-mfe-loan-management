import { FormControl, Select, SelectProps as MuiSelectProps } from '@mui/material';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { ReactNode } from 'react';
import { InputErrorText } from '../forms/InputFieldError';
import { Colors } from '@app/constants/colors';

export interface SelectProps extends MuiSelectProps {
   name: string;
   padding?: string;
   children?: ReactNode;
}

export const SelectInput: React.FC<SelectProps> = ({ children, ...props }) => {
   return (
      <Field name={props.name}>
         {({ field, form }: FieldProps) => {
            return (
               <>
                  <FormControl fullWidth>
                     <Select
                        variant="standard"
                        {...props}
                        {...field}
                        displayEmpty
                        inputProps={{ id: props.name }}
                        error={!!(form.errors[props.name] && form.touched[props.name])}
                     >
                        {children}
                     </Select>
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

interface PlaceholderProp {
   text: string;
}

export const SelectPlaceholder: React.FC<PlaceholderProp> = ({ text }) => {
   return <span style={{ color: Colors.LightGray4 }}>{text}</span>;
};
