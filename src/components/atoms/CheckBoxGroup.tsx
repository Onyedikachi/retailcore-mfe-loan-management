import {
   FormGroupProps as MuiFormGroupProps,
   FormControl,
   FormControlLabel,
   Checkbox,
   FormGroup,
} from '@mui/material';
import { Field, FieldProps, ErrorMessage } from 'formik';
import { InputErrorText } from '../forms/InputFieldError';
import React from 'react';

export interface CheckBoxGroupProps extends MuiFormGroupProps {
   name: string;
   options: string[];
   actionComp?: React.ReactNode[];
}

export const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({ actionComp, options, ...props }) => {
   const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, form: FieldProps['form']) => {
      const { value, checked } = event.target;
      if (checked) {
         setSelectedValues((prevValues) => [...prevValues, value]);
      } else {
         setSelectedValues((prevValues) => prevValues.filter((v) => v !== value));
      }
      form.handleChange(event);
      form.setFieldValue(props.name, selectedValues);
   };

   return (
      <Field name={props.name}>
         {({ field, form }: FieldProps) => {
            return (
               <>
                  <FormControl fullWidth>
                     <FormGroup {...props} {...field} id={props.name}>
                        {options.map((option, id) => (
                           <React.Fragment key={id}>
                              <FormControlLabel
                                 sx={{ mb: 1 }}
                                 value={option}
                                 control={
                                    <Checkbox
                                       id={props.name}
                                       name={props.name}
                                       sx={{ mr: 1 }}
                                       onChange={(e) => handleCheckboxChange(e, form)}
                                       value={option}
                                    />
                                 }
                                 label={option}
                              />
                              {selectedValues.includes(option) && actionComp && actionComp[id]}
                           </React.Fragment>
                        ))}
                     </FormGroup>

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
