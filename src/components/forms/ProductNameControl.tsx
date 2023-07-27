import { InputAdornment, Typography } from '@mui/material';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import { Colors, CommonFormFieldNames, CommonTooltipText } from '@app/constants';
import { InputProps } from '../atoms';
import { InputErrorText, InputSuccessText } from './InputFieldError';
import { Icon } from '../atoms/Icon';

export type ProductNameProps = Partial<InputProps> & {
   name?: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
   maxTextLength?: number;
   availableMessage?: string;
   isAvailable?: boolean;
   formik?: any;
};

export const ProductNameControl = ({
   name,
   required,
   label,
   tooltipText,
   placeholder,
   maxTextLength,
   availableMessage,
   isAvailable,
   formik: { values },
   ...otherProps
}: ProductNameProps) => {
   const length = values[name ?? CommonFormFieldNames.PRODUCT_NAME]?.length;
   const isGreater = maxTextLength && length >= maxTextLength;
   return (
      <FormControlWrapper
         name={name ?? CommonFormFieldNames.PRODUCT_NAME}
         label={label ?? 'Product Name'}
         required={required ?? true}
         tooltipText={tooltipText ?? CommonTooltipText.PRODUCT_NAME}
      >
         <FormControlBase
            name={name ?? CommonFormFieldNames.PRODUCT_NAME}
            control="input"
            placeholder={placeholder ?? 'Enter the product name'}
            inputProps={{ maxLength: maxTextLength }}
            InputProps={{
               ...(maxTextLength && {
                  endAdornment: (
                     <InputAdornment position="end">
                        <Typography color={Colors.LightGray3}>
                           {isGreater ? (
                              <Icon type="check-circle" color="success" />
                           ) : (
                              `${length}/${maxTextLength}`
                           )}
                        </Typography>
                     </InputAdornment>
                  ),
               }),
            }}
            {...(otherProps as any)}
         />
         {length > 0 && isAvailable === true && <InputSuccessText successText={availableMessage ?? ''} />}
         {isAvailable === false && <InputErrorText errorText={availableMessage ?? ''} />}
      </FormControlWrapper>
   );
};
