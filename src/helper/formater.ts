export const formattedDate = (datetime: string | Date, withoutDay?: boolean) => {
   const date = new Date(datetime);
   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   const day = date.getDate();
   const month = monthNames[date.getMonth()];
   const year = date.getFullYear();
   if (withoutDay) {
      return `${month}, ${year}`;
   } else {
      return `${day} ${month}, ${year}`;
   }
};

export const bigValueFormatter = (value: string | number, suffixType: 'long' | 'short' = 'short') => {
   if (isNaN(Number(value))) throw Error('pass a number argument to formatter');
   const suffix = [
      {
         min: 4,
         max: 6,
         longSuffux: 'Thousand',
         shortSuffix: 'K',
      },
      {
         min: 7,
         max: 9,
         longSuffux: 'Million',
         shortSuffix: 'M',
      },
      {
         min: 10,
         max: 12,
         longSuffux: 'Billion',
         shortSuffix: 'B',
      },
      {
         min: 13,
         max: 15,
         longSuffux: 'Trillion',
         shortSuffix: 'T',
      },
   ];
   if (Number(value) < 1000) return `${value}`;
   for (const s of suffix) {
      if (`${parseInt(value + '')}`.length >= s.min && `${parseInt(value + '')}`.length <= s.max) {
         const substr = `${value}`.substring(0, `${parseInt(value + '')}`.length - (s.min - 1));
         return `${substr}${suffixType == 'long' ? s.longSuffux : s.shortSuffix}`;
      }
   }
   return `${value}`;
};
