import { RETAIL_AUTH_API_PATH, environmentVar } from '@app/constants';
import jwtDecode from 'jwt-decode';

let requestInProgress = false;
export const refreshToken = async () => {
   const { CORE_TOKEN, REFRESH_TOKEN, CORE_TOKEN_NAME } = environmentVar();
   const decodedToken = jwtDecode<{ exp: number }>(CORE_TOKEN ?? '');

   const expTime = (decodedToken?.exp ?? 0) * 1000;

   // Only refresh token if core token is remaining 10 mins to expiration.
   if (expTime - Date.now() <= 600_000 && !requestInProgress) {
      requestInProgress = true;

      const response = await fetch(RETAIL_AUTH_API_PATH.REFRESH_TOKEN, {
         method: 'POST',
         body: JSON.stringify({ refresh: REFRESH_TOKEN }),
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (response.ok) {
         const body = JSON.parse((await response.text()) ?? '{}');
         body.access && localStorage.setItem(CORE_TOKEN_NAME, body.access);
      }

      requestInProgress = false;
   }
};
