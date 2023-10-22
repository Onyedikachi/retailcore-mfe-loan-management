import { BookLoanData } from '@app/@types/book-loan';
import { CustomerData } from '@app/@types/customer';
import { LoanProductData } from '@app/@types/loan-product';

export const mapBookLoanToSchema = (
   bookLoanData: BookLoanData,
   customers?: CustomerData,
   product?: LoanProductData,
   isDraft?: boolean
) => {
   const { customerInformation, facilityDetails, transactionSettings } = bookLoanData;
   const profile = customers?.customer_profiles[0];

   const backendData = {
      productId: product?.id,
      customerName: `${profile?.firstName} ${profile?.otherNames ?? ''} ${profile?.surname}`,
      customerId: profile?.customerId,
      acctNo: customerInformation?.acctNo,
      bvn: profile?.bvn,
      productPurpose: facilityDetails?.productPurpose,
      principal: facilityDetails?.principal,
      interestRate: facilityDetails?.interestRate ? Number(facilityDetails?.interestRate) : undefined,
      tenorValue: facilityDetails?.tenorValue,
      tenorPeriod: facilityDetails?.tenorPeriod,
      isMoratoriumReq: facilityDetails?.isMoratoriumReq,
      moratoriumValue: facilityDetails?.moratoriumValue,
      moratiriumPeriod: facilityDetails?.moratoriumPeriod,
      moratoriumDoration: facilityDetails?.recognize_moratorium_period,
      isGraceReq: facilityDetails?.isGraceReq,
      graceValue: facilityDetails?.graceValue,
      gracePeriod: facilityDetails?.gracePeriod,
      disburseMethd: transactionSettings?.disburseMethd,
      disburseAcct: transactionSettings?.disburseAcct,
      disburseDate: transactionSettings?.disburseDate,
      otherAcctNo: transactionSettings?.otherAcctNo,
      isDisburseNotReq: transactionSettings?.isDisburseNotReq,
      notificationChannel: transactionSettings?.notificationChannel.toString(),
      repaymentChannel: transactionSettings?.repaymentChannel,
      repaymentAcct: transactionSettings?.repaymentAcct,
      isDraft: isDraft ?? false,
      repaymentPattern: facilityDetails?.repayment_pattern,
      repaymentFrequency: facilityDetails?.repayment_frequency,
      repaymentFrequencyStartDate: facilityDetails?.start_date,
      repaymentFrequencyValue: facilityDetails?.start_date_num,
      repaymentFrequencyPeriod: facilityDetails?.start_date_period,
      equityContribution: facilityDetails?.equity_contrib,
      loanAssets: facilityDetails?.collaterals,
   };
   type BackendData = typeof backendData;
   const filteredBackendData = Object.fromEntries(
      Object.entries(backendData).filter(([, value]) => value !== undefined && value !== '')
   ) as Partial<BackendData>;

   return filteredBackendData;
};
