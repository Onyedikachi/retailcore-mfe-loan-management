import React, { useCallback, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isTokenValid } from '@Sterling/shared';
import { BasePath, REQUEST_NAMES, RETAIL_CORE_API_PATH, RoutePaths } from './constants';
import { usePermission } from './hooks/usePermission';
import { useRequest } from 'react-http-query';

export const Root = () => {
   const { pathname } = useLocation();
   const pathnameRef = useRef<string | null>(null);
   const [nextPathname, setNextPathname] = useState<string>('');
   const { checkPermission, isSuperAdmin, authLoaded, user } = usePermission();

   // This request fetches currency list & caches for the usage elsewhere, so request is only being made once.
   useRequest({
      onMount: (getCurrencyList) =>
         getCurrencyList(RETAIL_CORE_API_PATH.GET_CURRENCY, { showSuccess: false }),
      memoryStorage: true,
      name: REQUEST_NAMES.CURRENCY_LIST,
   });

   const checkUserAuthentication = useCallback(() => {
      const isAuthenticated = isTokenValid();
      let newPathName = pathname === BasePath ? RoutePaths.DashboardOverview.absolute : '';
      const permissions = Object.values(RoutePaths).find(
         ({ absolute }) => absolute === pathname
      )?.permissions;

      if (checkPermission(permissions ?? []) || isSuperAdmin) {
         pathnameRef.current = newPathName || pathname;
      } else if (isAuthenticated && user) {
         newPathName = pathnameRef.current ?? '/login';
      }

      setNextPathname(isAuthenticated ? newPathName : '/login');
   }, [pathname, isSuperAdmin]);

   React.useEffect(() => {
      authLoaded && checkUserAuthentication();
   }, [checkUserAuthentication, authLoaded]);

   return nextPathname ? <Navigate to={nextPathname} state={{ expired: true }} /> : <Outlet />;
};
