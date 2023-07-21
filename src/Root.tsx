import React, { useCallback, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isTokenValid } from '@Sterling/shared';
import { usePermission } from './hooks';
import { BasePath, RoutePaths } from './constants';

export const Root = () => {
   const { pathname } = useLocation();
   const pathnameRef = useRef<string | null>(null);
   const [nextPathname, setNextPathname] = useState<string>('');
   const { checkPermission, isSuperAdmin, authLoaded } = usePermission();

   const checkUserAuthentication = useCallback(() => {
      const isAuthenticated = isTokenValid();
      let newPathName = pathname === BasePath ? RoutePaths.PersonalLoan.absolute : '';

      if (checkPermission(['']) || isSuperAdmin) {
         pathnameRef.current = newPathName || pathname;
      } else {
         newPathName = pathnameRef.current ?? '/login';
      }

      setNextPathname(isAuthenticated ? newPathName : '/login');
   }, [pathname, isSuperAdmin]);

   React.useEffect(() => {
      authLoaded && checkUserAuthentication();
   }, [checkUserAuthentication, authLoaded]);

   return nextPathname ? <Navigate to={nextPathname ?? '/login'} state={{ expired: true }} /> : <Outlet />;
};
