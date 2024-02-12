export interface CustomerData {
   customerId: string;
   customerType: string;
   status: string;
   monitoring: boolean;
   isTerminated: boolean;
   approvalStatus: string;
   tenantId?: string;
   initiator: string;
   initiatorId: string;
   approver: string;
   approverId: string;
   team?: string;
   teamId?: string;
   createdAt: string;
   updatedAt: string;
   customer_profiles: CustomerProfile[];
   customer_products: CustomerProduct[];
   risk_assessments: any[];
   signatories: any[];
   executives: any[];
   other_accounts: any[];
   customer_account_balances: AccountBalance[];
   requests: CustomerRequest[];
   requestInReview?: any;
   hasRequestInReview: boolean;
   riskStatus?: string;
   riskScore?: number;
}

export interface CustomerProfile {
   customerProfileId: string;
   customerId: string;
   customerNumber: string;
   customerEntityId: string;
   bvn?: string;
   email?: string;
   title?: string;
   relationshipOfficer?: string;
   emailAddress?: string;
   dateOfBirth: string;
   firstName: string;
   surname: string;
   gender: string;
   idNumber: string;
   idType?: string;
   mobileNumber: string;
   nationality: string;
   otherNames: string;
   residentialAddress: string;
   residentialAddressCity: string;
   residentialAddressCountry: string;
   residentialAddressLGA: string;
   residentialAddressState: string;
   stateOfOrigin: string;
   nin: string;
   cac?: string;
   tin?: string;
   mothersMaidenName: string;
   maritalStatus: string;
   country: string;
   lga?: string;
   cityTown?: string;
   dualCitizenship?: string;
   ifYesSpecify?: string;
   chooseAnId?: string;
   issueDate?: string;
   expiryDate?: string;
   detailedAddressOfResidentialAddress?: string;
   alternateMobileNumber?: string;
   mailingAddressSameAsResidentialAddress?: string;
   donok_title?: string;
   donok_surname?: string;
   donok_firstName?: string;
   donok_otherNames?: string;
   relationship?: string;
   donok_gender?: string;
   donok_dateOfBirth?: string;
   donok_detailedDescriptionOfResidentialAddress?: string;
   customersPhoto?: string;
   [key: string]: unknown;
}

export interface CustomerProduct {
   customerProductId: string;
   customerId: string;
   productId: string;
   productName: string;
   productCode: string;
   accountNumber: string;
   ledgerId: string;
   customerContractId: string;
   glData: GLData;
   productCategory: string;
   productType: null | string;
   balance: string;
   status: string;
   postNoDebit: boolean;
   postNoCredit: boolean;
   interimApprovalConfigProductId: string;
   createdAt: string;
   updatedAt: string;
}

interface GLData {
   id: string;
   name: string;
   gl_class: GLClass;
   ledger_code: string;
   description: string;
   state: string;
   post_no_debit: boolean;
   post_no_credit: boolean;
}

interface GLClass {
   id: string;
   name: string;
   debit_impact_on_balance: string;
   credit_impact_on_balance: string;
   code: string;
   children_count: number;
   is_configured: boolean;
}

export interface AccountBalance {
   customerAccountBalanceId: string;
   customerId: string;
   productId: string;
   accountNumber: string;
   openingBalance: string;
   operatingBalance: string;
   closingBalance: string;
   availableBalance: string;
   totalBalance: string;
   processed: boolean;
   status: string;
   createdAt: string;
   updatedAt: string;
   ledgerId: string;
}

export interface CustomerRequest {
   requestId: string;
   customerId: string;
   requestTitle: string;
   requestType: string;
   justification: string | null;
   initiator: string;
   initiatorId: string;
   status: string;
   approvalStatus: string;
   approver: string;
   approverId: string;
   data: any;
   customerType: string;
   creationMode: string;
   team: string | null;
   teamId: string | null;
   withdrawn: boolean;
   isDeleted: boolean;
   deletedOn: string | null;
   createdAt: string;
   updatedAt: string;
   waiver_requests: any[];
}
