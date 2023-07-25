export const LoanTenurePeriod = ['Hours', 'Days', 'Weeks', 'Months', 'Years'];
export const Periodicity = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually'];
export const DocumentFomat = ['PDF', 'PNG', 'JPEG', 'XML', 'FIG', 'MS Word', 'PSD'];

export const CommonFormFieldNames = {
   PRODUCT_NAME: 'product_name',
   MIN_LOAN_PRINCIPAL: 'min_loan_principal',
   MAX_LOAN_PRINCIPAL: 'max_loan_principal',
   DESCRIPTION: 'product_description',
   PRODUCT_CURRENCY: 'currency',
   PRODUCT_CURRENCY_ID: 'currency_id',
} as const;

export const CommonTooltipText = {
   PRODUCT_NAME: 'Enter a product name for this loan product',
   MIN_LOAN_PRINCIPAL:
      'Specify the minimum amount of money that can be borrowed as the principal for this loan product',
   MAX_LOAN_PRINCIPAL:
      'Specify the maximum amount of money that can be borrowed as the principal for this loan product',
   DESCRIPTION: 'Enter a description for this loan product ',
   PRODUCT_CURRENCY: 'Select an applicable currency for this loan product ',
};
