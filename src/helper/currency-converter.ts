export const currencyToNumber = (currency: string) => {
   return parseFloat(currency.replace(',', '') ?? 0);
};
