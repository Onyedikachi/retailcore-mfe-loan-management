import { FormControl, Select, SelectProps as MuiSelectProps, styled } from '@mui/material';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { ReactNode } from 'react';
import { InputErrorText } from '../forms/InputFieldError';
import { Colors } from '@app/constants/colors';

const StyledSelect = styled(Select)(({ variant }) => ({
   ...(variant === 'standard' && {
      '&::placeholder': { color: Colors.LightGray4 },
      '&:focus': { borderBottomColor: 'red', background: 'transparent' },
   }),
   '.MuiSelect-icon': {
      fontSize: '30px',
   },
}));

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
                     <StyledSelect
                        variant="standard"
                        {...props}
                        {...field}
                        displayEmpty
                        inputProps={{ id: props.name }}
                        error={!!(form.errors[props.name] && form.touched[props.name])}
                     >
                        {children}
                     </StyledSelect>
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
