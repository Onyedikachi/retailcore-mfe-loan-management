import { SecurityEligibilityDocumentType } from '@app/@types';
import { environmentVar } from './environment-var';

const API_V1 = '/api/v1';
const { RETAIL_AUTH_BASE_URL, RETAIL_CORE_BASE_URL, CUSTOMER_MANAGEMENT_BASE_URL } = environmentVar();
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

export const CUSTOMER_MANAGEMENT_PATH = {
   GET_INDIVIDUAL_CUSTOMERS: `${CUSTOMER_MANAGEMENT_BASE_URL}/v1/customer/profile/type/individual`,
   GET_SME_CUSTOMERS: `${CUSTOMER_MANAGEMENT_BASE_URL}/v1/customer/profile/type/sme`,
   GET_CUSTOMER: `${CUSTOMER_MANAGEMENT_BASE_URL}/v1/customer/profile`,
};
export const REQUEST_NAMES = {
   CURRENCY_LIST: 'CURRENCY_LIST_REQUEST',
} as const;

export const CommonPayloadKeys = {
   isDraft: 'is_draft',
   productId: 'product_info_id',
};
