import { SecurityEligibilityDocumentType } from '@app/@types';

const API_V1 = '/api/v1';

export const API_PATH = {
   GET_CURRENCY: `${API_V1}/currency`,
   PRODUCT_INFO: (param?: string) => `${API_V1}/product-info${param ? '/' + param : ''}`,
   PRODUCT_NAME_AVAILABILITY: (name: string) => `${API_V1}/product-info/available/${name}`,
   SECURITY_ELIGIBILITY_DOCUMENT: (param?: SecurityEligibilityDocumentType | string) =>
      `${API_V1}/eligibility-document/security${param ? '/' + param : ''}`,
};
