import { CommonFormFieldNames, CommonTooltipText, REQUEST_NAMES } from '@app/constants';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import { useRequestData } from 'react-http-query';
import { CurrencyListResponse } from '@app/@types/currency-list';
import { SelectProps } from '../atoms/select';

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
            options={value?.data?.map((currency) => currency.abbreviation) ?? []}
         />
      </FormControlWrapper>
   );
};
