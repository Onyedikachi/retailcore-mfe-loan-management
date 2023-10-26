import React from 'react';
import { auth$ } from '@Sterling/shared';
import { AuthenticatedUserPayload } from '@app/@types/authenticated-user';
import { Permissions } from '@app/constants';

export const usePermission = () => {
   const [authPayload, setAuthPayload] = React.useState<AuthenticatedUserPayload | null>(null);
   const [authLoaded, setAuthLoaded] = React.useState<boolean>(false);

   React.useEffect(() => {
      let sub: any;
      if (auth$) {
         sub = auth$.subscribe((value: AuthenticatedUserPayload) => {
            setAuthLoaded(true);
            setAuthPayload(value);
         });
      }

      return () => {
         if (sub) {
            sub.unsubscribe();
         }
      };
   }, [auth$]);

   const userPermissions = authPayload?.user?.tenant_admin
      ? Object.values(authPayload?.SYSTEM_PERMISSIONS)
      : authPayload?.user?.user_permissions;

   const checkPermission = (permissions: string[]) =>
      permissions?.some((role) => userPermissions?.includes(role));

   const checker = [
      Permissions['AUTHORIZE_BOOKING/RESTRUCTURING_REQUESTS'],
      Permissions['AUTHORIZE_LIQUIDATION/WRITE-OFF_REQUESTS'],
   ];
   const allRecords = [Permissions.VIEW_ALL_LOAN_RECORDS];
   const allRequest = [Permissions.VIEW_ALL_LOAN_REQUESTS];
   const isSuperAdmin = authPayload?.user?.tenant_admin;

   const isUserAChecker = isSuperAdmin ?? checker?.some((element) => userPermissions?.includes(element));
   const accessAllRecords = isSuperAdmin ?? allRecords?.some((element) => userPermissions?.includes(element));
   const accessAllRequests =
      isSuperAdmin ?? allRequest?.some((element) => userPermissions?.includes(element));

   return {
      ...authPayload,
      checkPermission,
      authLoaded,
      isUserAChecker,
      isSuperAdmin,
      accessAllRecords,
      accessAllRequests,
   };
};
