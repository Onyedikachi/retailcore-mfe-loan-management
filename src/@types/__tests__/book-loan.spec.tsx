import { BookLoanData, BookLoanDataType } from '../book-loan';

const bookLoanData: BookLoanData = {
   customerInformation: { acctNo: '123456' },
   facilityDetails: {
      productId: '123',
      product_name: 'Sample Product',
      product_category: 'Sample Category',
      productPurpose: 'Sample Purpose',
      principal: '1000',
      interestRate: '5',
      tenorPeriod: '12',
      tenorValue: '100',
      moratoriumPeriod: '12',
      isMoratoriumReq: true,
      isGraceReq: true,
      gracePeriod: '12',
      graceValue: '100',
      collaterals: [
         {
            id: 'collateral1',
            COLLATERAL_FILE_UPLOADED: 'collateral_file',
            COLLATERAL_MARKET_VALUE: 'collateral_market_value',
         },
      ],
      equity_contrib: 'collateral',
      moratoriumValue: 'collateral',
      recognize_moratorium_period: 'test',
      repayment_frequency: 'MONTHLY',
      repayment_pattern: 'MONTHLY',
      start_date: 'now',
      start_date_num: '1',
      start_date_period: 'MONTHS',
   },
   transactionSettings: {
      disburseAcct: 'test',
      disburseDate: 'test',
      disburseMethd: 'On Approval',
      isDisburseNotReq: true,
      notificationChannel: ['test'],
      otherAcctNo: '120302',
      repaymentAcct: 'test',
      repaymentChannel: 'test',
   },
};

describe('BookLoanData Interface', () => {
   test('customerInformation property should be of type CustomerInfoFormValues or undefined', () => {
      expect(bookLoanData.customerInformation).toBeDefined();
      expect(bookLoanData.customerInformation).toHaveProperty('acctNo');
      if (bookLoanData.customerInformation) {
         expect(bookLoanData.customerInformation.acctNo).toBeDefined();
         expect(typeof bookLoanData.customerInformation.acctNo).toBe('string');
      }
   });

   test('facilityDetails property should be of type ExtendedFacilityDetails or undefined', () => {
      expect(bookLoanData.facilityDetails).toBeDefined();
      if (bookLoanData.facilityDetails) {
         expect(bookLoanData.facilityDetails.productId).toBe('123');
      }
   });

   test('transactionSettings property should be of type TransactionSettingsFormValues or undefined', () => {
      expect(bookLoanData.transactionSettings).toBeDefined();
      if (bookLoanData.transactionSettings) {
         expect(bookLoanData.transactionSettings.disburseMethd).toBe('On Approval');
      }
   });
});

describe('BookLoanDataType Type', () => {
   test('should allow CustomerInfoFormValues', () => {
      const bookLoanData: BookLoanDataType = { acctNo: '123456' };
      expect(bookLoanData).toHaveProperty('acctNo');
      expect(typeof bookLoanData.acctNo).toBe('string');
   });

   test('should allow ExtendedFacilityDetails', () => {
      expect(bookLoanData).toHaveProperty('transactionSettings');
      expect(bookLoanData.facilityDetails?.isGraceReq).toBe(true);
   });

   test('should allow TransactionSettingsFormValues', () => {
      expect(bookLoanData).toHaveProperty('transactionSettings');
      expect(bookLoanData.customerInformation?.acctNo).toBe('123456');
   });
});
