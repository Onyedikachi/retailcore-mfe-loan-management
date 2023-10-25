import { StatusCardProps } from '@app/@types/dashboard';
import { Permissions } from './permissions';

export const individualLoanFilterOptions = (key?: string | number, isUserAChecker?: boolean) => {
   return key == tabOptions[0].key
      ? ['Created system-wide', 'Created by me', 'Created by my branch']
      : isUserAChecker
      ? ['Sent system-wide', 'Sent by me', 'Sent by my branch']
      : ['Intiated system-wide', 'Intiated by me', 'Intiated by my branch'];
};

export interface DataCount {
   all?: number;
   approved?: number;
   inReview?: number;
   inIssue?: number;
   draft?: number;
   performing?: number;
   nonPerforming?: number;
   closed?: number;
   rejected?: number;
}
export const tabCardOptions = (
   dataCount?: DataCount,
   isUserAChecker?: boolean
): Record<string, Array<Omit<StatusCardProps, 'isActive' | 'onClick'>>> => {
   return {
      requests: isUserAChecker
         ? [
              { label: 'All', value: dataCount?.all ?? 0, variant: 'black' },
              { label: 'Approved', value: dataCount?.approved ?? 0, variant: 'success' },
              { label: 'Pending', value: dataCount?.inReview ?? 0, variant: 'info' },
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

export const menuFromStatus = (menu: string) => {
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
         return ['View', 'Liquidate Loan', 'Close Loan Account', 'Write-Off Loan'];
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
         return 'LIQUIDATED';
      case loanActions[1]:
         return 'CLOSED';
      case loanActions[2]:
         return 'WRITE_OFF';
      default:
         return;
   }
};

export const menuActionFromStatus = (menu: string) => {
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
         return ['View Loan Details', 'Close Loan', 'Liquidate Loan', 'Write-Off Loan'];
      default:
         return ['View Loan Details'];
   }
};
export const modifyLoan = (action: string) =>
   action == 'Withdraw & Modify' || action == 'Modify' || action == 'Continue Request';

export const deleteLoan = (action: string) =>
   action == 'Delete Request' || action == 'Withdraw & Delete Request';
