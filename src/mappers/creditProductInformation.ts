import { ProductInformation } from '@app/@types/book-a-loan';
import ObjectMapper from 'object-mapper';
/* eslint-disable camelcase */

const mapper = {
   product_name: 'product_name',
   product_description: 'product_description',
   currency: 'currency',
   currency_id: 'currency_id',
   min_loan_tenure: 'min_loan_tenure',
   min_loan_tenure_period: 'min_loan_tenure_period',
   max_loan_tenure: 'max_loan_tenure',
   max_loan_tenure_period: 'max_loan_tenure_period',
   min_loan_principal: {
      key: 'min_loan_principal',
      transform: (val: string) => (val ? parseFloat(val) : ''),
   },
   max_loan_principal: {
      key: 'max_loan_principal',
      transform: (val: string) => (val ? parseFloat(val) : ''),
   },
   allow_multiple_req: {
      key: 'allow_multiple_req',
      transform: (val: string) => Boolean(Number(val)),
   },
   is_draft: {
      key: 'is_draft',
      transform: (val: string) => Boolean(Number(val)),
   },
};

export const productInfoMapper = (productInfo: ProductInformation) =>
   ObjectMapper.merge(productInfo, mapper) as ProductInformation;
