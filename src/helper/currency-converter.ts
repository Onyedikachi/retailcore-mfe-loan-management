export const currencyToNumber = (currency?: string | number) => {
   return typeof currency === 'number' ? currency : parseFloat(currency?.replace(/[,%]/g, '') ?? '0');
};
