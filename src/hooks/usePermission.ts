import React from 'react';
import { auth$ } from '@Sterling/shared';
import { AuthenticatedUserPayload } from '@app/@types/authenticated-user';
import { Permissions } from '@app/constants';

export interface PermissionHelperProps {
   checkPermission: (permissions: string[]) => boolean;
   authLoaded?: boolean;
   isUserAChecker?: boolean;
   isSuperAdmin?: boolean;
   accessAllRecords?: boolean;
   accessAllRequests?: boolean;
   canLiquidate?: boolean;
   canWriteOff?: boolean;
   [key: string]: any;
}

export const usePermission = (): PermissionHelperProps => {
   const [authPayload, setAuthPayload] = React.useState<AuthenticatedUserPayload | null>(null);
   const [authLoaded, setAuthLoaded] = React.useState<boolean>(false);

   React.useEffect(() => {
      let sub: any;
      const fetchData = async () => {
         if (auth$) {
            sub = await auth$.subscribe((value: AuthenticatedUserPayload) => {
               setAuthLoaded(true);
               setAuthPayload(value);
            });
         }
      };

      fetchData();
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
      Permissions.AUTHORIZE_BOOKING_RESTRUCTURING_REQUESTS,
      Permissions.AUTHORIZE_LIQUIDATION_WRITE_OFF_REQUESTS,
      Permissions.VIEW_ALL_LOAN_REQUESTS,
   ];
   const allRecords = [Permissions.VIEW_ALL_LOAN_RECORDS];
   const allRequest = [Permissions.VIEW_ALL_LOAN_REQUESTS];
   const isSuperAdmin = authPayload?.user?.tenant_admin;
   const liquidate = [Permissions.LIQUIDATE_LOAN];
   const writeOff = [Permissions['WRITE_OFF_LOAN']];

   const isUserAChecker = isSuperAdmin || checker?.some((element) => userPermissions?.includes(element));
   const accessAllRecords = isSuperAdmin || allRecords?.some((element) => userPermissions?.includes(element));
   const accessAllRequests =
      isSuperAdmin || allRequest?.some((element) => userPermissions?.includes(element));
   const canLiquidate = isUserAChecker || liquidate?.some((element) => userPermissions?.includes(element));
   const canWriteOff = isUserAChecker || writeOff?.some((element) => userPermissions?.includes(element));
   sessionStorage.setItem('superAdmin', `${isSuperAdmin}`);

   return {
      ...authPayload,
      checkPermission,
      authLoaded,
      isUserAChecker,
      isSuperAdmin,
      accessAllRecords,
      accessAllRequests,
      canLiquidate,
      canWriteOff,
   };
};
