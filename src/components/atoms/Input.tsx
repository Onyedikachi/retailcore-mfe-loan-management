import React, { ReactNode } from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { InputErrorText } from '../forms/InputFieldError';
import { FormControl, TextField, TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps & {
   name: string;
   allow?: string;
   children?: ReactNode;
};

export const Input: React.FC<InputProps> = (props) => {
   const handleAllowed = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      form: FieldProps['form'],
      allow?: string
   ) => {
      const target = e.target as HTMLInputElement;

      const re = /\D/g;
      let input = target.value;
      if (allow === FORM_ALLOWED.NUMBER) input = input.replace(re, '');
      form.handleChange(e);
      form.setFieldValue(props.name, input);
   };

   return (
      <Field name={props.name}>
         {({ field, form }: FieldProps) => {
            return (
               <FormControl fullWidth>
                  <TextField
                     variant="standard"
                     id={props.name}
                     {...props}
                     {...field}
                     label={props.label && props.placeholder}
                     onChange={(e) => handleAllowed(e, form, props.allow)}
                     type={props.type || 'text'}
                     error={!!(form.errors[props.name] && form.touched[props.name])}
                     inputProps={{ autoComplete: 'off' }}
                  />
                  <ErrorMessage
                     name={props.name}
                     children={(error: string) => <InputErrorText errorText={error} />}
                  />
               </FormControl>
            );
         }}
      </Field>
   );
};

interface FormAllowProps {
   NUMBER: string;
}
export const FORM_ALLOWED: FormAllowProps = {
   NUMBER: 'number',
};

export const UncontrolledInput: React.FC<InputProps> = (props) => {
   return (
      <FormControl fullWidth>
         <TextField
            variant="filled"
            disabled
            id={props.name}
            {...props}
            label={props.label && props.placeholder}
            type={props.type || 'text'}
         />
      </FormControl>
   );
};
