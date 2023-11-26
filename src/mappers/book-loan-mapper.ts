import { BookLoanData } from '@app/@types/book-loan';
import { CustomerData } from '@app/@types/customer';
import { BookedLoanData, LoanProductData } from '@app/@types/loan-product';
import { currencyInputFormatter, currencyToNumber } from '@app/helper/currency-helper';
import { parseDateString } from '@app/helper/formater';
import { format } from 'date-fns';

export const mapBookLoanToSchema = (
   bookLoanData: BookLoanData,
   customers?: CustomerData,
   product?: LoanProductData,
   isDraft?: boolean
) => {
   const { customerInformation, facilityDetails, transactionSettings } = bookLoanData;
   const profile = customers?.customer_profiles[0];
   const disbursementDate = parseDateString(transactionSettings?.disburseDate ?? '');
   const startDate = parseDateString(facilityDetails?.start_date ?? '');
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
      disburseDate: transactionSettings?.disburseDate && disbursementDate ? disbursementDate : undefined,
      otherAcctNo: transactionSettings?.otherAcctNo,
      isDisburseNotReq: transactionSettings?.isDisburseNotReq,
      notificationChannel: transactionSettings?.notificationChannel.toString(),
      repaymentChannel: transactionSettings?.repaymentChannel,
      repaymentAcct: transactionSettings?.repaymentAcct,
      isDraft: isDraft ?? false,
      repaymentPattern: facilityDetails?.repayment_pattern,
      repaymentFrequency: facilityDetails?.repayment_frequency,
      repaymentFrequencyStartDate: facilityDetails?.start_date && startDate ? startDate : undefined,
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

export const mapSchemaToBookLoan = (loan: BookedLoanData): BookLoanData => {
   const { currency: formattedCurrency } = currencyInputFormatter(loan.principal.toString());
   const repaymentDate = parseDateString(loan?.repaymentFrequencyStartDate);
   const disbursedDate = parseDateString(loan?.disburseDate);
   return {
      customerInformation: { acctNo: loan.acctNo },
      facilityDetails: {
         productId: loan?.product?.id ?? loan?.productId,
         product_name: loan.product?.name,
         product_category: loan.product.category,
         productPurpose: loan.productPurpose,
         principal: formattedCurrency,
         interestRate: loan.interestRate.toString(),
         tenorValue: loan?.tenorValue.toString(),
         tenorPeriod: loan?.tenorPeriod,
         repayment_pattern: loan?.repaymentPattern,
         repayment_frequency: loan?.repaymentFrequency,
         start_date:
            loan?.repaymentFrequencyStartDate && repaymentDate
               ? format(new Date(repaymentDate), 'dd/MM/yyyy')
               : '',
         start_date_num: loan?.repaymentFrequencyValue,
         start_date_period: loan?.repaymentFrequencyPeriod,
         collaterals: [],
         equity_contrib: loan?.equityContribution?.toString() ?? '',
         isMoratoriumReq: loan?.isMoratoriumReq,
         moratoriumPeriod: loan?.moratoriumPeriod ?? '',
         moratoriumValue: loan?.moratoriumValue.toString() ?? '',
         recognize_moratorium_period: loan?.moratoriumDuration ?? '',
         isGraceReq: loan?.isGraceReq,
         gracePeriod: loan?.gracePeriod,
         graceValue: loan?.graceValue.toString() ?? '',
      },
      transactionSettings: {
         disburseMethd: loan?.disburseMethd,
         disburseAcct: loan?.disburseAcct,
         disburseDate:
            loan?.disburseDate && disbursedDate ? format(new Date(disbursedDate), 'dd/MM/yyyy') : '',
         otherAcctNo: loan?.otherAcctNo,
         isDisburseNotReq: loan?.isDisburseNotReq,
         notificationChannel: [loan?.notificationChannel],
         repaymentChannel: loan?.repaymentChannel,
         repaymentAcct: loan?.repaymentAcct,
      },
   };
};

export const mapRepaymentScheduleToSchema = (bookLoanData: BookLoanData, product?: LoanProductData) => {
   const moratoriumVal = Number(bookLoanData?.facilityDetails?.moratoriumValue);
   const graceValue = Number(bookLoanData?.facilityDetails?.graceValue);
   const disbursementDate = parseDateString(bookLoanData?.transactionSettings?.disburseDate ?? '');
   const data = {
      productId: product?.id,
      principal: currencyToNumber(bookLoanData?.facilityDetails?.principal ?? ''),
      tenorPeriod: bookLoanData?.facilityDetails?.tenorPeriod,
      tenorValue: Number(bookLoanData?.facilityDetails?.tenorValue),
      moratoriumValue: moratoriumVal > 0 ? moratoriumVal : undefined,
      moratoriumPeriod: bookLoanData?.facilityDetails?.moratoriumPeriod,
      moratoriumDuration: bookLoanData?.facilityDetails?.recognize_moratorium_period,
      isMoratoriumReq: bookLoanData?.facilityDetails?.isMoratoriumReq,
      isGraceReq: bookLoanData?.facilityDetails?.isGraceReq,
      interestRate: Number(bookLoanData?.facilityDetails?.interestRate),
      disbursementDate:
         bookLoanData?.transactionSettings?.disburseDate && disbursementDate ? disbursementDate : undefined,
      gracePeriod: graceValue > 0 ? graceValue : undefined,
   };
   type Data = typeof data;
   const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined && value !== '')
   ) as Partial<Data>;
   return filteredData;
};
