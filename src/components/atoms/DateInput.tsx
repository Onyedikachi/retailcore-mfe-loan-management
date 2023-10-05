import {
   InputAdornment,
   IconButton,
   TextField,
   FormControl,
   TextFieldProps,
   Menu,
   Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState, ReactNode } from 'react';
import { Calendar, CalenderProp } from '../calendar/Calendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Field, ErrorMessage, FieldProps, useFormikContext } from 'formik';
import { InputErrorText } from '../forms/InputFieldError';
import { format, parse } from 'date-fns';
export type DateInputProps = TextFieldProps &
   CalenderProp & {
      name: string;
      extraLeft?: ReactNode;
      extraRight?: ReactNode;
      showErrorMessage?: boolean;
      minDateString?: string;
   };

export const DateInput: React.FC<DateInputProps> = ({
   placeholder,
   name,
   extraLeft,
   extraRight,
   minDateString,
   showErrorMessage = true,
   ...props
}) => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [date, setDate] = useState<Date | undefined>();
   const { setFieldValue } = useFormikContext();

   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      if (!{ ...(props as TextFieldProps) }.disabled) {
         setAnchorEl(event.currentTarget);
      }
   };
   const handleMenuClose = () => setAnchorEl(null);

   useEffect(() => {
      if (date) {
         setFieldValue(name, format(date, 'dd/MM/yyyy'));
      }
   }, [date]);

   return (
      <Field name={name}>
         {({ field }: FieldProps) => {
            return (
               <>
                  <Box display="flex" alignItems="end">
                     {extraLeft && <Typography mr={1}>{extraLeft}</Typography>}
                     <FormControl fullWidth onClick={handleMenuOpen}>
                        <TextField
                           variant="standard"
                           placeholder={placeholder ?? 'Select a date'}
                           name={name}
                           value={field.value}
                           type="text"
                           inputProps={{ autoComplete: 'off', ...props.inputProps }}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton
                                       edge="end"
                                       sx={{ mr: 0.1 }}
                                       disabled={{ ...(props as TextFieldProps) }.disabled}
                                    >
                                       <CalendarMonthIcon />
                                    </IconButton>
                                 </InputAdornment>
                              ),
                           }}
                           {...(props as TextFieldProps)}
                        />
                     </FormControl>
                     <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                     >
                        <Calendar
                           onDateChange={(date) => {
                              setDate(date);
                              handleMenuClose();
                           }}
                           minDate={
                              props.minDate
                                 ? props.maxDate
                                 : minDateString
                                 ? parse(minDateString, 'dd/MM/yyyy', new Date())
                                 : undefined
                           }
                           onClickClear={() => setFieldValue(name, '')}
                           {...(props as CalenderProp)}
                        />
                     </Menu>
                     {extraRight && <Typography ml={1}>{extraRight}</Typography>}
                  </Box>
                  {showErrorMessage && (
                     <ErrorMessage
                        name={name}
                        children={(error: string) => <InputErrorText errorText={error} />}
                     />
                  )}
               </>
            );
         }}
      </Field>
   );
};
