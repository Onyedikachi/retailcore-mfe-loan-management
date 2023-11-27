export interface LoanProductData {
   id: string;
   name: string;
   description: string;
   code: string;
   type: string;
   typeId?: string;
   category: string;
   categoryId?: string;
   subCategory?: string;
   subCategoryId?: string;
   currency: string;
   currencyId: string;
   maxLoanTenure: number;
   maxLoanTenurePeriod: string;
   minLoanTenure: number;
   minLoanTenurePeriod: string;
   minLoanPrincipal: number;
   maxLoanPrincipal: number;
   minInterestRate: number;
   maxInterestRate: number;
   allowMultipleReq: boolean;
   isDraft: boolean;
   status?: string;
   requestStatus: string;
   createdById: string;
   createdBy: string;
   dateCreated: string;
   lastModifiedById?: string;
   lastModifiedBy?: string;
   lastModifiedDate?: string;
   approvedBy?: string;
   approvedById?: string;
   approvedDate?: string;
   tenantId: string;
   deletedDate?: string;
   deletedById?: string;
   deleteBy?: string;
   currentStep: number;
   productEligibilityCriteriaRequirement:
      | ProductEligibilityCriteriaRequirement[]
      | ProductEligibilityCriteriaRequirement;
   pricingConfiguration: PricingConfiguration[] | PricingConfiguration;
   chargesTaxesPenalty: ChargesTaxesPenalty[];
   accountingEntry?: any;
}

interface ProductEligibilityCriteriaRequirement {
   status?: string;
   earnType?: string;
   earnValue: number;
   earnPeriodValue: number;
   earnPeriod?: string;
   requireEarning: boolean;
   requireEquityContrib: boolean;
   equityContribType: string;
   contributionValueFrom: number;
   contributionValueTo: number;
   requireSecurity: boolean;
   requireOtherEligibilityCriteria: boolean;
   hasEligibility: boolean;
   isDraft: boolean;
   productId: string;
   eligibilityCriteriaSecurityDocs?: any;
   id: string;
   approvedBy?: string;
   approvedById?: string;
   approvedDate?: string;
   lastModifiedById?: string;
   lastModifiedBy?: string;
   lastModifiedDate?: string;
   createdById: string;
   createdBy: string;
   dateCreated: string;
   tenantId: string;
   deletedDate?: string;
   deletedById?: string;
   deleteBy?: string;
}

interface PricingConfiguration {
   intCalcMethod: string;
   intComputeDays: string;
   intRateConfigBand: string;
   productId: string;
   id: string;
   deletedDate?: string;
   deletedById?: string;
   deleteBy?: string;
}

interface IntRateConfigBand {
   MaxInterestRate: number;
   MaxPrincipalValue?: string;
   MinInterestRate: number;
   MinPrincipalValue?: string;
}
interface ChargesTaxesPenalty {
   chargeTaxEvent: string;
   isPenaltyReq: boolean;
   breachPenalty: string;
   interestRate: number;
   productId: string;
   chargeAndTaxes?: any;
   id: string;
   deletedDate?: str;
   deletedById?: str;
   deleteBy?: str;
}

export interface BookedLoanData {
   id: string;
   productId?: string;
   customerName: string;
   customerId: string;
   acctNo: string;
   bvn: string;
   productPurpose: string;
   principal: number;
   interestRate: number;
   tenorValue: number;
   tenorPeriod: string;
   isMoratoriumReq: boolean;
   moratoriumValue: number;
   moratoriumPeriod: string | null;
   moratoriumDuration: string | null;
   isGraceReq: boolean;
   graceValue: number;
   totalRepayment: string | number;
   principalBalance: string | number;
   interestBalance: string | number;
   arrears: string | number;
   penaltyDue: string | number;
   gracePeriod: string;
   disburseMethd: string;
   disburseAcct: string;
   disburseDate: string;
   otherAcctNo: string;
   isDisburseNotReq: boolean;
   notificationChannel: string;
   repaymentChannel: string;
   repaymentSource: string;
   repaymentAcct: string;
   status: string;
   tenantId: string;
   createdBy: string;
   createdById: string;
   dateCreated: string;
   lastModifiedById: string | null;
   lastModifiedBy: string;
   lastModifiedDate: string | null;
   approvedBy: string;
   approvedById: string | null;
   approvedDate: string | null;
   deletedDate: string | null;
   deletedById: string | null;
   deleteBy: string;
   requestStatus: string;
   repaymentPattern: string;
   repaymentFrequency: string;
   repaymentFrequencyStartDate: string;
   repaymentFrequencyValue: string;
   repaymentFrequencyPeriod: string;
   equityContribution: number | null;
   product: LoanProductData;
   loanAssets: any[];
   loanActivities: LoanActivity[];
}

interface LoanActivity {
   id: string;
   commentText: string;
   action: string;
   loanId: string;
   createdById: string;
   createdBy: string;
   dateCreated: string;
   lastModifiedById: string | null;
   lastModifiedBy: string;
   lastModifiedDate: string | null;
   approvedBy: string;
   approvedById: string | null;
   approvedDate: string | null;
   tenantId: string;
   deletedDate: string | null;
   deletedById: string | null;
   deleteBy: string;
}

interface StatusCounts {
   pending?: number;
   approved?: number;
   inReview?: number;
   inIssue?: number;
   performing?: number;
   nonPerforming?: number;
   active?: number;
   inActive?: number;
   draft?: number;
   all?: number;
   closed?: number;
   rejected?: number;
}
interface LoanPaymentSchedule {
   monthlyInterest: number;
   principalPayment: number;
   repaymentAmount: number;
   openingBalance: number;
   outstandingBalance: number;
   disbursementDate: string;
   gracePeriod: string;
}
