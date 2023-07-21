import { CommonFormFieldNames, CommonTooltipText } from '@app/constants';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import { SelectProps } from '../atoms';

export type ProductCurrencyControlProps = Partial<SelectProps> & {
   name?: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
};

export const ProductCurrencyControl = ({
   name,
   label,
   required,
   tooltipText,
   placeholder,
   ...otherProps
}: ProductCurrencyControlProps) => {
   return (
      <FormControlWrapper
         name={name ?? CommonFormFieldNames.PRODUCT_CURRENCY}
         label={label ?? 'Product Currency'}
         required={required ?? true}
         tooltipText={tooltipText ?? CommonTooltipText.PRODUCT_CURRENCY}
      >
         <FormControlBase
            control="select"
            name={name ?? CommonFormFieldNames.PRODUCT_CURRENCY}
            placeholder={placeholder ?? 'Select a product currency'}
            {...otherProps}
            options={['NG', 'USD', 'EUR']}
         />
      </FormControlWrapper>
   );
};
