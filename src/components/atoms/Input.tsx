import React, { ReactNode } from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { InputErrorText } from '../forms/InputFieldError';
import { Box, FormControl, TextField, TextFieldProps, Typography } from '@mui/material';

export type InputProps = TextFieldProps & {
   name: string;
   allow?: string;
   children?: ReactNode;
   currency?: boolean;
   extraLeft?: ReactNode;
   extraRight?: ReactNode;
};

export const Input: React.FC<InputProps> = ({ extraLeft, extraRight, currency, ...props }) => {
   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      form: FieldProps['form']
   ) => {
      const target = e.target as HTMLInputElement;

      const re = /[^.0-9]/g;
      let input = target.value;
      if (props.allow === FORM_ALLOWED.NUMBER) input = input.replace(re, '');
      if (currency) {
         const rawValue = e.target.value.replace(/[^\d.]/g, '');
         const parts = rawValue.split('.');
         if (parts.length > 2) return;
         const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
         const formattedValue = parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart;
         input = formattedValue;
      }
      form.handleChange(e);
      props?.onChange?.(e);
      form.setFieldValue(props.name, input);
   };

   return (
      <Field name={props.name}>
         {({ field, form }: FieldProps) => {
            return (
               <>
                  <Box display="flex" alignItems="end">
                     {extraLeft && <Typography mr={2}>{extraLeft}</Typography>}
                     <FormControl fullWidth>
                        <TextField
                           variant="standard"
                           id={props.name}
                           {...props}
                           {...field}
                           label={props.label && props.placeholder}
                           onChange={(e) => handleChange(e, form)}
                           type={props.type || 'text'}
                           error={!!(form.errors[props.name] && form.touched[props.name])}
                           inputProps={{ autoComplete: 'off' }}
                        />
                     </FormControl>
                     {extraRight && <Typography ml={2}>{extraRight}</Typography>}
                  </Box>
                  <ErrorMessage
                     name={props.name}
                     children={(error: string) => <InputErrorText errorText={error} />}
                  />
               </>
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
