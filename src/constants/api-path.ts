import { SecurityEligibilityDocumentType } from '@app/@types';

const API_V1 = '/api/v1';

export const API_PATH = {
   PRODUCT_INFO: (param?: string) => `${API_V1}/product-info${param ? '/' + param : ''}`,
   PRODUCT_NAME_AVAILABILITY: (name: string) => `${API_V1}/product-info/available/${name}`,
   SECURITY_ELIGIBILITY_DOCUMENT: (param?: SecurityEligibilityDocumentType | string) =>
      `${API_V1}/eligibility-document/security${param ? '/' + param : ''}`,
};

const RETAIL_CORE_BASE_URL = `${process.env.RETAIL_CORE_BASE_URL ?? ''}${API_V1}`;

export const RETAIL_CORE_API_PATH = {
   GET_CURRENCY: `${RETAIL_CORE_BASE_URL}/currency`,
};

export const REQUEST_NAMES = {
   CURRENCY_LIST: 'CURRENCY_LIST_REQUEST',
} as const;
