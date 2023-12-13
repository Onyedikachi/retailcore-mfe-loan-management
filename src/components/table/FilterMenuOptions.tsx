import { CheckerViewPermissions, Permissions } from '@app/constants/permissions';

export const AllOptions = {
   createdByMe: {
      label: 'Created by me',
      key: 'createdByMe',
      enums: 'CREATEDBYME',
      permissions: [Permissions.BOOK_LOAN],
   },
   createdSystemWide: {
      label: 'Created system-wide',
      key: 'createdSystemWide',
      enums: 'CREATEDSYSTEMWIDE',
      permissions: [Permissions.VIEW_ALL_LOAN_RECORDS],
   },
   approvedByMe: {
      label: 'Approved by me',
      key: 'approvedByMe',
      enums: 'APPROVEDBYME',
      permissions: [Permissions.AUTHORIZE_BOOKING_RESTRUCTURING_REQUESTS],
   },
   approvedSystemWide: {
      label: 'Approved system-wide',
      key: 'approvedSystemWide',
      enums: 'APPROVED',
      permissions: [Permissions.AUTHORIZE_BOOKING_RESTRUCTURING_REQUESTS],
   },
   initiatedByMe: {
      label: 'Initiated by me',
      key: 'initiatedByMe',
      enums: 'INITIATEDBYME',
      permissions: [Permissions.VIEW_ALL_LOAN_RECORDS],
   },
   initiatedByMyBranch: {
      label: 'Initiated by my branch',
      key: 'initiatedByMyBranch',
      enums: 'INITIATEDBYMYBRANCH',
      permissions: CheckerViewPermissions,
   },
   initiatedSystemWide: {
      label: 'Initiated system-wide',
      key: 'initiatedSystemWide',
      enums: 'INITIATEDSYSTEMWIDE',
      permissions: [Permissions.VIEW_ALL_LOAN_RECORDS],
   },
   sentToMe: {
      label: 'Sent to me',
      key: 'sentToMe',
      enums: 'SENTTOME',
      permissions: CheckerViewPermissions,
   },
   sentToMyBranch: {
      label: 'Sent by my branch',
      key: 'sentToMyBranch',
      enums: 'SENTTOMYBRANCH',
      permissions: CheckerViewPermissions,
   },
   sentSystemWide: {
      label: 'Sent system-wide',
      key: 'sentSystemWide',
      enums: 'SENTSYSTEMWIDE',
      permissions: CheckerViewPermissions,
   },
};
