import { FormControl, Select, SelectProps as MuiSelectProps, styled, MenuItem } from '@mui/material';
import { Field, ErrorMessage, FieldProps } from 'formik';
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
   options: string[];
   placeholder: string;
}

export const SelectInput: React.FC<SelectProps> = ({ options, placeholder, ...props }) => {
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
                        defaultValue=""
                        displayEmpty
                        inputProps={{ id: props.name }}
                        error={!!(form.errors[props.name] && form.touched[props.name])}
                        renderValue={(value: unknown) =>
                           value ? value : <SelectPlaceholder text={placeholder} />
                        }
                     >
                        {options.map((option, id) => (
                           <MenuItem value={option} key={id}>
                              {option}
                           </MenuItem>
                        ))}
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
