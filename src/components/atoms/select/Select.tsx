import { FormControl, Select, SelectProps as MuiSelectProps, styled, MenuItem } from '@mui/material';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { InputErrorText } from '../../forms/InputFieldError';
import { Colors } from '@app/constants/colors';
import { SelectPlaceholder } from './Placeholder';

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
   options: Array<string | { value: string; disable?: boolean }>;
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
                        onChange={(event) => {
                           props?.onChange?.(event, props.children);
                           field?.onChange?.(event);
                        }}
                        onBlur={field.onBlur}
                        value={field.value ?? ''}
                        defaultValue={props.defaultValue ?? ''}
                        displayEmpty
                        inputProps={{ id: props.name }}
                        error={!!(form.errors[props.name] && form.touched[props.name])}
                        renderValue={(value: unknown) => value || <SelectPlaceholder text={placeholder} />}
                     >
                        {options.map((option) => {
                           const value = typeof option == 'string' ? option : option.value;
                           const disable = typeof option == 'string' ? false : option?.disable;
                           return (
                              <MenuItem value={value} key={value} disabled={disable}>
                                 {value}
                              </MenuItem>
                           );
                        })}
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
