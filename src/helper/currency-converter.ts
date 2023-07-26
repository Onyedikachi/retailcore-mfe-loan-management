export const currencyToNumber = (currency: string) => {
   return typeof currency === 'number' ? currency : parseFloat(currency.replace(/,/g, '') ?? 0);
};
