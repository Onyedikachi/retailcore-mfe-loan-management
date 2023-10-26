export const mockLoanProduct = {
   product: {
      name: 'Test Product',
      currency: 'USD',
   },
   customerName: 'John Doe',
   acctNo: '123456',
   loanAssets: [{ name: 'Asset 1' }],
};

export const mockCustomerData = {
   customerId: '12345',
   customerType: 'Individual',
   status: 'Active',
   monitoring: true,
   isTerminated: false,
   approvalStatus: 'Approved',
   initiator: 'John Doe',
   initiatorId: '6789',
   approver: 'Jane Smith',
   approverId: '9876',
   createdAt: '2022-01-15',
   updatedAt: '2022-10-20',
   customer_profiles: [
      {
         firstName: 'John',
         surname: 'Doe',
         otherNames: 'Smith',
         bvn: '1234567890',
         mobileNumber: '9876543210',
      },
   ],
   customer_products: [
      {
         productId: '78901',
         productName: 'Savings Account',
      },
      {
         productId: '23456',
         productName: 'Credit Card',
      },
   ],
   risk_assessments: [],
   signatories: [],
   executives: [],
   other_accounts: [],
   customer_account_balances: [],
   requests: [],
   hasRequestInReview: false,
   riskStatus: 'Low',
   riskScore: 75,
};
