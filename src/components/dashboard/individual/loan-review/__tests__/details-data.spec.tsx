import { detailsList } from '../details-data';

const mockLoanProduct: any = {
   customerName: 'John Doe',
   acctNo: '123456',
   product: {
      category: 'Personal Loan',
      currency: 'USD',
   },
   principal: 10000,
   interestRate: 5,
   tenorValue: 12,
   tenorPeriod: 'months',
   repaymentPattern: 'Equal Installments',
   repaymentFrequency: 'Monthly',
   repaymentFrequencyStartDate: '2024-01-01',
   repaymentFrequencyValue: 1,
   moratoriumValue: 3,
   moratoriumPeriod: 'months',
   graceValue: 1,
   gracePeriod: 'months',
   repaymentChannel: 'Bank Transfer',
   repaymentAcct: '123-456-789',
};

const mockCustomer: any = {
   customerType: 'Individual',
   status: 'Active',
   customer_profiles: [
      {
         mobileNumber: '123-456-7890',
         emailAddress: 'john.doe@example.com',
      },
   ],
};

test('detailsList function returns an array', () => {
   const result = detailsList();
   expect(Array.isArray(result)).toBe(true);
});

test('detailsList function returns correct details structure with valid input', () => {
   const result = detailsList(mockLoanProduct, mockCustomer);
   expect(result).toEqual(expect.any(Array));
   expect(result).toHaveLength(6);
   expect(result[0].title).toBe('Customer Information');
});

test('detailsList function handles undefined input gracefully', () => {
   const result = detailsList();
   expect(result).toEqual(expect.any(Array));
   expect(result).toHaveLength(6);
});

test('detailsList function handles missing loan product data', () => {
   const result = detailsList(undefined, mockCustomer);
   expect(result).toEqual(expect.any(Array));
   expect(result).toHaveLength(6);
});

test('detailsList function handles missing customer data', () => {
   const result = detailsList(mockLoanProduct, undefined);
   expect(result).toEqual(expect.any(Array));
   expect(result).toHaveLength(6);
});

test('detailsList function handles missing loan product and customer data', () => {
   const result = detailsList();
   expect(result).toEqual(expect.any(Array));
   expect(result).toHaveLength(6);
});

test('detailsList function handles different repayment patterns', () => {
   const loanProduct = { ...mockLoanProduct, repaymentPattern: 'Bullet Repayment' };
   const result = detailsList(loanProduct, mockCustomer);
   expect(result).toEqual(expect.any(Array));
   expect(result).toHaveLength(6);
});
