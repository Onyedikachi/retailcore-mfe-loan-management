export const environmentVar = () => {
   const env = {
      dev: {
         API_URL: 'https://loan-managementms-api.dev.bepeerless.co',
         CORE_TOKEN: localStorage.getItem('@sterling_core_token'),
         CORE_TOKEN_NAME: '@sterling_core_token',
         REFRESH_TOKEN: localStorage.getItem('@sterling_core_refresh'),
         RETAIL_CORE_BASE_URL: 'https://retailcore-accounting-api.dev.bepeerless.co',
         RETAIL_AUTH_BASE_URL: 'https://retailcore-auth-api.dev.bepeerless.co',
         CUSTOMER_MANAGEMENT_BASE_URL: 'https://customer-management-api.dev.bepeerless.co',
      },
      dev2: {
         API_URL: 'https://loan-managementms-api.dev.bepeerless.co',
         CORE_TOKEN: localStorage.getItem('@sterling_core_token_dev2'),
         CORE_TOKEN_NAME: '@sterling_core_token_dev2',
         REFRESH_TOKEN: localStorage.getItem('@sterling_core_refresh_dev2'),
         RETAIL_CORE_BASE_URL: 'https://dev2-retailcore-accounting-api.dev.bepeerless.co',
         RETAIL_AUTH_BASE_URL: 'https://dev2-retailcore-auth-api.dev.bepeerless.co',
         CUSTOMER_MANAGEMENT_BASE_URL: 'https://customer-management-api.dev.bepeerless.co',
      },
      qa: {
         API_URL: '',
         CORE_TOKEN: localStorage.getItem(''),
         CORE_TOKEN_NAME: '',
         REFRESH_TOKEN: localStorage.getItem(''),
         RETAIL_CORE_BASE_URL: '',
         RETAIL_AUTH_BASE_URL: '',
         CUSTOMER_MANAGEMENT_BASE_URL: '',
      },
      production: {
         API_URL: '',
         CORE_TOKEN: localStorage.getItem(''),
         CORE_TOKEN_NAME: '',
         REFRESH_TOKEN: localStorage.getItem(''),
         RETAIL_CORE_BASE_URL: '',
         RETAIL_AUTH_BASE_URL: '',
         CUSTOMER_MANAGEMENT_BASE_URL: '',
      },
   };

   let envName: 'dev' | 'dev2' | 'qa' | 'development' = 'dev2';
   const url = location.host;

   if (url.includes('dev') && !url.includes('dev2')) envName = 'dev';
   return env[envName];
};
