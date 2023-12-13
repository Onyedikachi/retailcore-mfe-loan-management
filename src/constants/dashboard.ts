import { StatusCardProps } from '@app/@types/dashboard';
import { StatusCounts } from '@app/@types/loan-product';
import { PermissionHelperProps } from '@app/hooks/usePermission';
import { Permissions } from './permissions';
export const Count = 20;
export const individualLoanFilterOptions = (
   key?: string | number,
   isUserAChecker?: boolean,
   accessAllRecords?: boolean,
   accessAllRequests?: boolean
) => {
   let options;
   // const checkerOptions = ;
   const filterOptions = isUserAChecker
      ? ['Sent to me', 'Sent system-wide']
      : ['Initiated by me', 'Initiated system-wide'];
   if (key == tabOptions[0].key) {
      options = ['Created by me', 'Created system-wide'];
      return accessAllRecords ? options : options.filter((op) => !op.includes('system-wide'));
   } else {
      options = filterOptions;
      return accessAllRequests ? options : options.filter((op) => !op.includes('system-wide'));
   }
};

export const tabCardOptions = (
   dataCount?: StatusCounts,
   checkerOption?: boolean
): Record<string, Array<Omit<StatusCardProps, 'isActive' | 'onClick'>>> => {
   return {
      requests: checkerOption
         ? [
              { label: 'All', value: dataCount?.all ?? 0, variant: 'black' },
              { label: 'Approved', value: dataCount?.approved ?? 0, variant: 'success' },
              { label: 'Pending', value: dataCount?.pending ?? 0, variant: 'info' },
              { label: 'Rejected', value: dataCount?.rejected ?? 0, variant: 'error' },
           ]
         : [
              { label: 'All', value: dataCount?.all ?? 0, variant: 'black' },
              { label: 'Approved', value: dataCount?.approved ?? 0, variant: 'success' },
              { label: 'In-Review', value: dataCount?.inReview ?? 0, variant: 'info' },
              { label: 'In-Issue', value: dataCount?.inIssue ?? 0, variant: 'error' },
              { label: 'Draft', value: dataCount?.draft ?? 0, variant: 'gray' },
           ],
      records: [
         { label: 'All', value: dataCount?.all ?? 0, variant: 'black' },
         { label: 'Performing', value: dataCount?.performing ?? 0, variant: 'success' },
         { label: 'Non-Performing', value: dataCount?.nonPerforming ?? 0, variant: 'gray' },
         { label: 'Closed', value: dataCount?.closed ?? 0, variant: 'gray' },
      ],
   };
};

export const tabOptions = [
   { label: 'Records', key: 'records', permissions: [Permissions.VIEW_ALL_LOAN_RECORDS] },
   { label: 'Requests', key: 'requests', permissions: [Permissions.VIEW_ALL_LOAN_REQUESTS] },
];

const actionOptions = (permissions?: PermissionHelperProps) => {
   const options = ['View', 'Liquidate Loan', 'Close Loan Account', 'Write-Off Loan'];
   if (!permissions?.canLiquidate) {
      return options.filter((option) => option != 'Liquidate Loan');
   } else if (!permissions?.canWriteOff) {
      return options.filter((option) => option != 'Write-Off Loan');
   } else if (!permissions?.isUserAChecker) {
      return options.filter((option) => option != 'Close Loan Account');
   } else {
      return options;
   }
};
export const menuFromStatus = (menu: string, permissions?: PermissionHelperProps) => {
   switch (menu) {
      case 'Approved':
      case 'Settled':
      case 'Closed':
         return ['View'];
      case 'In-Issue':
         return ['View', 'Modify', 'Delete Request'];
      case 'In-Review':
         return ['View', 'Withdraw & Modify', 'Withdraw & Delete Request'];
      case 'Draft':
         return ['Continue Request', 'Delete Request'];
      case 'Active':
      case 'Performing':
      case 'Non-Performing':
      case 'Watchlist':
      case 'Substandard':
      case 'Doubtful':
      case 'Lost':
         return actionOptions(permissions);
      default:
         return ['View'];
   }
};
const loanActions = ['liquidation', 'closure', 'write-off'];

export const menuToAction = (menu: string) => {
   switch (menu) {
      case 'Liquidate Loan':
         return loanActions[0];
      case 'Close Loan Account':
         return loanActions[1];
      case 'Write-Off Loan':
         return loanActions[2];
      default:
         return;
   }
};
export const menuToAPIAction = (menu: string) => {
   switch (menu) {
      case loanActions[0]:
         return 'LIQUIDATE';
      case loanActions[1]:
         return 'CLOSED';
      case loanActions[2]:
         return 'WRITEOFFLOAN';
      default:
         return;
   }
};

export const menuActionFromStatus = (menu: string, permissions?: PermissionHelperProps) => {
   switch (menu) {
      case 'Approved':
      case 'Settled':
      case 'Closed':
      case 'In-Issue':
      case 'In-Review':
      case 'Draft':
         return ['View Loan Details'];
      case 'Active':
      case 'Performing':
      case 'Non-Performing':
      case 'Watchlist':
      case 'Substandard':
      case 'Doubtful':
      case 'Lost':
         return actionOptions(permissions);
      default:
         return ['View Loan Details'];
   }
};
export const modifyLoan = (action: string) =>
   action == 'Withdraw & Modify' || action == 'Modify' || action == 'Continue Request';

export const deleteLoan = (action: string) =>
   action == 'Delete Request' || action == 'Withdraw & Delete Request';
