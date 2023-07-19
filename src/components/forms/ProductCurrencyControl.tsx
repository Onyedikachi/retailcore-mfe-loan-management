import { CommonFormFieldNames, CommonTooltipText } from '@app/constants';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';

export interface ProductCurrencyControlProps {
   name?: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
}

export const ProductCurrencyControl = (props: ProductCurrencyControlProps) => {
   return (
      <FormControlWrapper
         name={props.name ?? CommonFormFieldNames.PRODUCT_CURRENCY}
         label={props.label ?? 'Product Currency'}
         required={props.required ?? true}
         tooltipText={props.tooltipText ?? CommonTooltipText.PRODUCT_CURRENCY}
      >
         <FormControlBase
            control="select"
            name={props.name ?? CommonFormFieldNames.PRODUCT_CURRENCY}
            placeholder={props.placeholder ?? 'Select a product currency'}
            options={['NG', 'USD', 'EUR']}
         />
      </FormControlWrapper>
   );
};
