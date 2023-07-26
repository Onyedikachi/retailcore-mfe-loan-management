export const currencyToNumber = (currency: string) => {
   return typeof currency === 'number' ? currency : parseFloat(currency.replace(',', '') ?? 0);
};
