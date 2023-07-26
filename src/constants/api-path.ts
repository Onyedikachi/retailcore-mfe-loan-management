import { SecurityEligibilityDocumentType } from '@app/@types';

export const API_URL = 'https://loan-management-api.dev.bepeerless.co';
export const RETAIL_CORE_BASE_URL = 'https://dev2-retailcore-accounting-api.dev.bepeerless.co';
export const RETAIL_AUTH_BASE_URL = 'https://dev2-retailcore-auth-api.dev.bepeerless.co';

const API_V1 = '/api/v1';

export const API_PATH = {
   PRODUCT_INFO: (param?: string) => `${API_V1}/product-info${param ? '/' + param : ''}`,
   PRODUCT_NAME_AVAILABILITY: (name: string) => `${API_V1}/product-info/available/${name}`,
   SECURITY_ELIGIBILITY_DOCUMENT: (param?: SecurityEligibilityDocumentType | string) =>
      `${API_V1}/eligibility-document/security${param ? '/' + param : ''}`,
   OTHER_ELIGIBILTY_REQUIREMENT: `${API_V1}/other-eligibility-req`,
   ELIGIBILITY_CRITERIA: (param?: string) => `${API_V1}/eligibility-criteria${param ? '/' + param : ''}`,
};

const RETAIL_CORE_V1 = `${RETAIL_CORE_BASE_URL ?? ''}${API_V1}`;
export const RETAIL_CORE_API_PATH = {
   GET_CURRENCY: `${RETAIL_CORE_V1}/currency`,
};

const RETAIL_AUTH_V1 = `${RETAIL_AUTH_BASE_URL ?? ''}${API_V1}`;
export const RETAIL_AUTH_API_PATH = {
   REFRESH_TOKEN: `${RETAIL_AUTH_V1}/token/refresh`,
};

export const REQUEST_NAMES = {
   CURRENCY_LIST: 'CURRENCY_LIST_REQUEST',
} as const;

export const CommonPayloadKeys = {
   isDraft: 'is_draft',
   productId: 'product_info_id',
};
