export const currencyToNumber = (currency?: string | number) => {
   return typeof currency === 'number' ? currency : parseFloat(currency?.replace(/[,%]/g, '') ?? '0');
};

export const formatCurrency = (number: number | string) =>
   new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
   }).format(Number(number));
