import React, { ReactNode } from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { InputErrorText } from '../forms/InputFieldError';
import { Box, FormControl, TextField, TextFieldProps, Typography } from '@mui/material';
import { FormAcceptType } from '@app/@types';
import { currencyInputFormatter, percentageInputFormatter } from '@app/helper/currency-helper';

export type InputProps = TextFieldProps & {
   name: string;
   allow?: FormAcceptType;
   children?: ReactNode;
   currency?: boolean;
   percentage?: boolean;
   ratio?: boolean;
   extraLeft?: ReactNode;
   extraRight?: ReactNode;
};

export const Input: React.FC<InputProps> = ({
   extraLeft,
   percentage,
   extraRight,
   currency,
   ratio,
   ...props
}) => {
   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      form: FieldProps['form']
   ) => {
      const target = e.target as HTMLInputElement;
      let input = target.value;

      if (props.allow === 'number') {
         const re = /(?:\b0(?:\.0*|$))|[^\d]/g;
         input = input.replace(re, '');
      }
      if (currency) {
         const { currency: formattedCurrency } = currencyInputFormatter(e.target.value);
         input = formattedCurrency;
      }
      if ((percentage || ratio) && (e.nativeEvent as any).data) {
         const { percentage: percentageValue, ratio: ratioValue } = percentageInputFormatter(e.target.value);
         input = percentage ? percentageValue : ratioValue;
         e.target.value = input;
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
                     {extraLeft && <Typography mr={1}>{extraLeft}</Typography>}
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
                           inputProps={{ autoComplete: 'off', ...props.inputProps }}
                        />
                     </FormControl>
                     {extraRight && <Typography ml={1}>{extraRight}</Typography>}
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
