import { renderHook } from '@testing-library/react-hooks';
import { useFormikCheckItems } from '../useFormikCheckItems';

jest.mock('../useCheckItems', () => ({
   useCheckItems: jest.fn(() => ({
      itemToggle: jest.fn(),
      checkedItems: [],
      updateItem: jest.fn(),
      setKey: jest.fn(),
      clearCheckedItems: jest.fn(),
      allItems: [],
   })),
}));

jest.mock('../useFormikHelper', () => ({
   useFormikHelper: jest.fn(() => ({
      arrayFieldsHelper: jest.fn(() => ({
         push: jest.fn(),
         find: jest.fn(() => ({ index: 0 })),
         removeAllAt: jest.fn(),
         resetField: jest.fn(),
      })),
   })),
}));

describe('useFormikCheckItems', () => {
   it('should return the correct functions', () => {
      const { result } = renderHook(() =>
         useFormikCheckItems([], [], 'itemKey', {
            fieldBaseName: 'fieldName',
         })
      );

      const { allItems, setKey, itemToggle, updateFormikState, checkedItems, clearCheckedItems } =
         result.current;

      expect(typeof allItems).toBe('object');
      expect(typeof setKey).toBe('function');
      expect(typeof itemToggle).toBe('function');
      expect(typeof updateFormikState).toBe('function');
      expect(typeof checkedItems).toBe('object');
      expect(typeof clearCheckedItems).toBe('function');
   });
});
