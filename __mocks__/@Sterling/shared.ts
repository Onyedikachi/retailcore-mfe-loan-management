// File: __mocks__/@Sterling/shared.ts
import mockUserProfile from '../../src/test/mocks/user-profile.json';

const auth$ = {
  subscribe: jest.fn((callbackfn: (value: any) => any) => callbackfn(mockUserProfile)),
  unsubscribe: jest.fn(),
};

export { auth$ };





