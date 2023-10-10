export const comparePaths = (base: string, compare: string) => {
   return base.replace(/\/$/, '') === compare.replace(/\/$/, '');
};
