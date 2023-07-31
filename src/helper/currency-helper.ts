import { isNullish } from '.';

export const currencyToNumber = (currency: string) => {
   return typeof currency === 'number' ? currency : parseFloat(currency.replace(/,/g, '') ?? 0);
};

export const currencyInputFormatter = (inputValue: string) => {
   const rawValue = inputValue.replace(/[^\d.]/g, '');
   const parts = rawValue.split('.');

   const integerPart = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
   const decimalPart = !isNullish(parts[1]) ? `.${parts[1].substring(0, 2)}` : '';

   return {
      parts,
      originalValue: inputValue,
      hasDecimal: !!parts[1],
      currency: `${integerPart}${decimalPart}`,
      integerPart,
      decimalPart,
   };
};

export const percentageInputFormatter = (inputValue: string) => {
   let value = inputValue.replace(/[^\d.]/g, '');
   value = Number(value) <= 100 ? value : value.substring(0, value.length - 1);
   const parts = value.split('.');
   const integerPart = `${parts[0]}`;
   const decimalPart = !isNullish(parts[1]) ? `.${parts[1].substring(0, 2)}` : '';

   return {
      parts,
      originalValue: inputValue,
      hasDecimal: !!parts[1],
      percentage: `${integerPart}${decimalPart}%`,
      ratio: `${integerPart}${decimalPart}`,
      integerPart,
      decimalPart,
   };
};
