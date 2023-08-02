import { renderHook } from '@testing-library/react-hooks';
import mockUserProfile from '@app/test/mocks/user-profile.json';
import { auth$ } from '@Sterling/shared';
import { usePermission } from '../usePermission';

const allSystemApplications = mockUserProfile.SYSTEM_PERMISSIONS;

jest.mock('@Sterling/shared', () => {
   const userProfiles = { ...mockUserProfile };
   return {
      auth$: {
         subscribe: jest.fn((callbackfn: (value: any) => any) => callbackfn(userProfiles)),
         unsubscribe: jest.fn(),
      },
   };
});

describe('usePermission', () => {
   it('should set authLoaded to true once loaded', () => {
      const { result } = renderHook(() => usePermission());
      const { authLoaded } = result.current;

      expect(authLoaded).toBe(true);
   });

   it('should set all permissions for `tenant_admin` user', () => {
      const { result } = renderHook(() => usePermission());
      const { checkPermission, isSuperAdmin } = result.current;

      expect(isSuperAdmin).toBe(true);
      expect(Object.values(allSystemApplications).every((permission) => checkPermission([permission]))).toBe(
         true
      );
   });

   it('should only set user permssion for non `tenant_admin` user', () => {
      auth$.subscribe = jest.fn((callbackfn: (value: any) => any) =>
         // eslint-disable-next-line camelcase
         callbackfn({ ...mockUserProfile, user: { ...mockUserProfile.user, tenant_admin: false } })
      );

      const { result } = renderHook(() => usePermission());
      const { checkPermission, isSuperAdmin } = result.current;

      expect(isSuperAdmin).toBe(false);
      expect(
         checkPermission([
            allSystemApplications.VIEW_ALL_INVESTMENT_PRODUCT_RECORDS,
            allSystemApplications.RE_OR_DE_ACTIVATE_PAYMENT_PRODUCT,
         ])
      ).toBe(false);
   });
});
