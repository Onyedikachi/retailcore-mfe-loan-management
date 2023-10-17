import { StatusCardProps } from '@app/@types/dashboard';

export const creditFilterOptions = [
   'Created by me',
   'Initiated by my team',
   'Created system-wide',
   'Approved by me',
   'Approved by my branch',
   'Approved system-wide',
];

export const tabCardOptions: Record<string, Array<Omit<StatusCardProps, 'isActive' | 'onClick'>>> = {
   requests: [
      { label: 'All', value: 0, variant: 'black' },
      { label: 'Approved', value: 0, variant: 'success' },
      { label: 'In-Review', value: 0, variant: 'info' },
      { label: 'In-Issue', value: 0, variant: 'error' },
      { label: 'draft', value: 0, variant: 'gray' },
   ],
   records: [
      { label: 'All', value: 0, variant: 'black' },
      { label: 'Performing', value: 0, variant: 'success' },
      { label: 'Non-Performing', value: 0, variant: 'gray' },
      { label: 'Closed', value: 0, variant: 'gray' },
   ],
};

export const tabOptions = [
   { label: 'Records', key: 'records' },
   { label: 'Requests', key: 'requests' },
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

export const modifyLoan = (action: string) =>
   action == 'Withdraw & Modify' || action == 'Modify' || action == 'Continue Request';

export const deleteLoan = (action: string) =>
   action == 'Delete Request' || action == 'Withdraw & Delete Request';
