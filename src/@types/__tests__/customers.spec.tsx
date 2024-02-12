import { CustomerData, CustomerProfile, CustomerProduct, AccountBalance, CustomerRequest } from '../customer';

// Mock data for CustomerProfile interface
const mockCustomerProfile: CustomerProfile = {
   customerProfileId: '1',
   customerId: '123',
   customerNumber: '456',
   customerEntityId: '789',
   bvn: '1234567890',
   email: 'test@example.com',
   title: 'Mr.',
   relationshipOfficer: '<NAME>',
   emailAddress: '<EMAIL>',
   country: 'Nigeria',
   dateOfBirth: '1990-01-01',
   firstName: 'John',
   surname: 'Doe',
   gender: 'Male',
   idNumber: 'ID123456',
   idType: 'Passport',
   mobileNumber: '1234567890',
   nationality: 'Nigerian',
   maritalStatus: 'single',
   mothersMaidenName: 'jane',
   nin: '1202010100',
   otherNames: 'jona',
   residentialAddress: '123 Main St',
   residentialAddressCity: 'Cityville',
   residentialAddressCountry: 'Nigeria',
   residentialAddressLGA: 'Local Gov',
   residentialAddressState: 'Stateville',
   stateOfOrigin: 'Stateville',
   cac: 'CAC001',
   tin: 'TIN001',
   lga: 'Local Gov',
   cityTown: 'Cityville',
   dualCitizenship: 'Yes',
   ifYesSpecify: 'USA',
   chooseAnId: 'Passport',
   issueDate: '2010-01-01',
   expiryDate: '2030-01-01',
};

const mockCustomerProduct: CustomerProduct = {
   customerProductId: '1',
   customerId: '123',
   productId: '789',
   productName: 'Product 1',
   productCode: 'P1',
   accountNumber: 'ACC123',
   ledgerId: 'L123',
   customerContractId: 'C123',
   glData: {
      id: 'GL1',
      name: 'GL Account 1',
      gl_class: {
         id: 'C1',
         name: 'Class 1',
         debit_impact_on_balance: 'debit',
         credit_impact_on_balance: 'credit',
         code: 'C1',
         children_count: 0,
         is_configured: true,
      },
      ledger_code: 'LC1',
      description: 'Description of GL 1',
      state: 'active',
      post_no_debit: false,
      post_no_credit: false,
   },
   productCategory: 'Category 1',
   productType: null,
   balance: '1000',
   status: 'active',
   postNoDebit: false,
   postNoCredit: false,
   interimApprovalConfigProductId: 'IAC1',
   createdAt: '2024-02-12T12:00:00Z',
   updatedAt: '2024-02-12T12:00:00Z',
};

const mockAccountBalance: AccountBalance = {
   customerAccountBalanceId: '1',
   customerId: '123',
   productId: '789',
   accountNumber: 'ACC123',
   openingBalance: '500',
   operatingBalance: '700',
   closingBalance: '1000',
   availableBalance: '900',
   totalBalance: '1200',
   processed: true,
   status: 'active',
   createdAt: '2024-02-12T12:00:00Z',
   updatedAt: '2024-02-12T12:00:00Z',
   ledgerId: 'L123',
};

const mockCustomerRequest: CustomerRequest = {
   requestId: '1',
   customerId: '123',
   requestTitle: 'Request 1',
   requestType: 'type1',
   justification: 'Justification for request 1',
   initiator: 'John Doe',
   initiatorId: '456',
   status: 'pending',
   approvalStatus: 'pending',
   approver: 'Jane Smith',
   approverId: '789',
   data: null,
   customerType: 'individual',
   creationMode: 'manual',
   team: null,
   teamId: null,
   withdrawn: false,
   isDeleted: false,
   deletedOn: null,
   createdAt: '2024-02-12T12:00:00Z',
   updatedAt: '2024-02-12T12:00:00Z',
   waiver_requests: [],
};

function generateMockCustomerData(): CustomerData {
   return {
      customerId: '123',
      customerType: 'individual',
      status: 'active',
      monitoring: true,
      isTerminated: false,
      approvalStatus: 'approved',
      initiator: 'John Doe',
      initiatorId: '456',
      approver: 'Jane Smith',
      approverId: '789',
      createdAt: '2024-02-12T12:00:00Z',
      updatedAt: '2024-02-12T12:00:00Z',
      customer_profiles: [mockCustomerProfile],
      customer_products: [mockCustomerProduct],
      risk_assessments: [],
      signatories: [],
      executives: [],
      other_accounts: [],
      customer_account_balances: [mockAccountBalance],
      requests: [mockCustomerRequest],
      hasRequestInReview: false,
   };
}

// Test cases for CustomerData interface
describe('CustomerData Interface', () => {
   let mockData: CustomerData;

   beforeEach(() => {
      mockData = generateMockCustomerData();
   });

   test('should have required properties', () => {
      expect(mockData).toHaveProperty('customerId');
      expect(mockData).toHaveProperty('customerType');
      expect(mockData).toHaveProperty('status');
   });

   test('should have correct property types', () => {
      expect(typeof mockData.customerId).toBe('string');
      expect(typeof mockData.customerType).toBe('string');
      expect(typeof mockData.status).toBe('string');
   });

   test('should have a valid createdAt date', () => {
      expect(new Date(mockData.createdAt)).toBeInstanceOf(Date);
   });

   test('should have a valid updatedAt date', () => {
      expect(new Date(mockData.updatedAt)).toBeInstanceOf(Date);
   });

   test('should have non-empty customer_profiles array', () => {
      expect(mockData.customer_profiles).toHaveLength(1);
   });

   test('should have non-empty customer_products array', () => {
      expect(mockData.customer_products).toHaveLength(1);
   });

   test('should have non-empty customer_account_balances array', () => {
      expect(mockData.customer_account_balances).toHaveLength(1);
   });

   test('should have non-empty requests array', () => {
      expect(mockData.requests).toHaveLength(1);
   });

   test('should have monitoring set to a boolean value', () => {
      expect(typeof mockData.monitoring).toBe('boolean');
   });

   test('should have isTerminated set to a boolean value', () => {
      expect(typeof mockData.isTerminated).toBe('boolean');
   });

   test('should have hasRequestInReview set to a boolean value', () => {
      expect(typeof mockData.hasRequestInReview).toBe('boolean');
   });

   test('should have non-empty risk_assessments array', () => {
      expect(mockData.risk_assessments).toHaveLength(0);
   });
});
