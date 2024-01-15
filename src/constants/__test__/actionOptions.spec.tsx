import { PermissionHelperProps } from '@app/hooks/usePermission';
import { actionOptions } from '../dashboard';

describe('actionOptions', () => {
   it('should filter options based on permissions', () => {
      const permissions: PermissionHelperProps = {
         canLiquidate: true,
         canWriteOff: false,
         isUserAChecker: false,
         checkPermission: (permissions: string[]) => true,
      };

      const result = actionOptions(permissions);
      expect(result).toEqual(['View', 'Liquidate Loan', 'Close Loan']);
   });

   it('should return all options if permissions allow all actions', () => {
      const permissions: PermissionHelperProps = {
         canLiquidate: true,
         canWriteOff: false,
         isUserAChecker: false,
         checkPermission: (permissions: string[]) => true,
      };

      const result = actionOptions(permissions);
      expect(result).toEqual(['View', 'Liquidate Loan', 'Close Loan']);
   });

   it('should handle undefined permissions', () => {
      const result = actionOptions();
      expect(result).toEqual(['View', 'Close Loan', 'Write-Off Loan']);
   });
});
