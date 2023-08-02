import { CommonFormFieldNames, CommonTooltipText, REQUEST_NAMES } from '@app/constants';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import { SelectProps } from '../atoms';
import { useRequestData } from 'react-http-query';
import { CurrencyListResponse } from '@app/@types/currency-list';

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
   const value = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);

   console.log(value);

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
            options={value?.results.map((currency) => currency.abbreviation) ?? []}
         />
      </FormControlWrapper>
   );
};
