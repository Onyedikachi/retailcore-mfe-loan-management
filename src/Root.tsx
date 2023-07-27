import React, { useCallback, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isTokenValid } from '@Sterling/shared';
import { BasePath, RoutePaths } from './constants';
import { usePermission } from './hooks/usePermission';

export const Root = () => {
   const { pathname } = useLocation();
   const pathnameRef = useRef<string | null>(null);
   const [nextPathname, setNextPathname] = useState<string>('');
   const { checkPermission, isSuperAdmin, authLoaded, user } = usePermission();

   const checkUserAuthentication = useCallback(() => {
      const isAuthenticated = isTokenValid();
      let newPathName = pathname === BasePath ? RoutePaths.PersonalLoan.absolute : '';
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
