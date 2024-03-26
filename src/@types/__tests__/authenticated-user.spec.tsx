import { AuthenticatedUserPayload } from '../authenticated-user'; // Assuming the types file is in a folder called 'types'
import { UserProfile } from '../user';

// Mock data for UserProfile
const mockUserProfile: UserProfile = {
   id: '1',
   firstname: 'John',
   lastname: 'Doe',
   email: 'john.doe@example.com',
   image: 'https://example.com/image.jpg',
   is_active: true,
   last_login: new Date(),
   created_at: new Date(),
   username: 'johndoe',
   external_reference: '123456',
   failed_password_attempts: 0,
   force_change_password: false,
   groups: [],
   is_staff: false,
   is_superuser: false,
   last_password_change_date: new Date(),
   phone: '1234567890',
   roles: [],
   team: 'Team 1',
   tenant: 'Tenant 1',
   tenant_admin: false,
   updated_at: new Date(),
   user_permissions: ['PERMISSION_1', 'PERMISSION_2'],
   verified: true,
};

// const mockAuthenticatedUserPayload: AuthenticatedUserPayload = {
//    user: mockUserProfile,
//    invalidateUser: () => {},
//    invalidateConfigs: () => {},
//    configs: {},
//    systemPermissions: {},
//    SYSTEM_PERMISSIONS: {
//       AUTHORIZE_BOOKING_RESTRUCTURING_REQUESTS: 'AUTHORIZE_BOOKING/RESTRUCTURING_REQUESTS',
//       AUTHORIZE_LIQUIDATION_WRITE_OFF_REQUESTS: 'AUTHORIZE_LIQUIDATION/WRITE-OFF_REQUESTS',
//       VIEW_ALL_LOAN_RECORDS: 'VIEW_ALL_LOAN_RECORDS',
//       VIEW_ALL_LOAN_REQUESTS: 'VIEW_ALL_LOAN_REQUESTS',
//       WRITE_OFF_LOAN: 'WRITE_OFF_LOAN',
//       BOOK_LOAN: 'BOOK_LOAN',
//       LIQUIDATE_LOAN: 'LIQUIDATE_LOAN',
//    },
//    invalidatePermissions: () => {},
// };

// describe('AuthenticatedUserPayload Interface', () => {
//    test('should have user property of type UserProfile or undefined', () => {
//       expect(mockAuthenticatedUserPayload).toHaveProperty('user');
//       expect(mockAuthenticatedUserPayload.user).toBeInstanceOf(Object); // or expect(mockAuthenticatedUserPayload.user).toBeInstanceOf(UserProfile);
//    });

//    test('should have invalidateUser property of type function', () => {
//       expect(mockAuthenticatedUserPayload).toHaveProperty('invalidateUser');
//       expect(typeof mockAuthenticatedUserPayload.invalidateUser).toBe('function');
//    });

//    test('should have invalidateConfigs property of type function', () => {
//       expect(mockAuthenticatedUserPayload).toHaveProperty('invalidateConfigs');
//       expect(typeof mockAuthenticatedUserPayload.invalidateConfigs).toBe('function');
//    });

//    test('should have configs property of type IUserConfig or undefined', () => {
//       expect(mockAuthenticatedUserPayload).toHaveProperty('configs');
//       expect(mockAuthenticatedUserPayload.configs).toBeInstanceOf(Object); // or expect(mockAuthenticatedUserPayload.configs).toBeInstanceOf(IUserConfig);
//    });

//    test('should have systemPermissions property of type IPermission', () => {
//       expect(mockAuthenticatedUserPayload).toHaveProperty('systemPermissions');
//       expect(mockAuthenticatedUserPayload.systemPermissions).toBeInstanceOf(Object); // or expect(mockAuthenticatedUserPayload.systemPermissions).toBeInstanceOf(IPermission);
//    });

//    test('should have SYSTEM_PERMISSIONS property of type typeof Permissions & Record<string, string>', () => {
//       expect(mockAuthenticatedUserPayload).toHaveProperty('SYSTEM_PERMISSIONS');
//       expect(mockAuthenticatedUserPayload.SYSTEM_PERMISSIONS).toBeInstanceOf(Object);
//    });

//    test('should have invalidatePermissions property of type function', () => {
//       expect(mockAuthenticatedUserPayload).toHaveProperty('invalidatePermissions');
//       expect(typeof mockAuthenticatedUserPayload.invalidatePermissions).toBe('function');
//    });
// });
