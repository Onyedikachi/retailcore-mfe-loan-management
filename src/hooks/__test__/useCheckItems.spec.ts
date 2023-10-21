import { renderHook } from '@testing-library/react-hooks';
import { useCheckItems } from '../useCheckItems';

describe('useCheckItems', () => {
   it('should initialize with default selected items', () => {
      const defaultSelectedItems = [
         { id: 1, name: 'Item 1' },
         { id: 3, name: 'Item 3' },
      ];

      const { result } = renderHook(() => useCheckItems([], defaultSelectedItems, 'id'));

      expect(result.current.checkedItems).toEqual(defaultSelectedItems);
   });

   it('should toggle item selection', () => {
      const initialItems = [
         { id: 1, name: 'Item 1' },
         { id: 2, name: 'Item 2' },
      ];

      const { result } = renderHook(() => useCheckItems(initialItems, [], 'id'));

      // Toggle item 1 selection
      result.current.itemToggle(1);
      expect(result.current.checkedItems).toEqual([{ id: 1, name: 'Item 1' }]);

      // Toggle item 2 selection
      result.current.itemToggle(2);
      expect(result.current.checkedItems).toEqual([
         { id: 1, name: 'Item 1' },
         { id: 2, name: 'Item 2' },
      ]);
   });

   it('should clear all checked items', () => {
      const defaultSelectedItems = [
         { id: 1, name: 'Item 1' },
         { id: 3, name: 'Item 3' },
      ];

      const { result } = renderHook(() => useCheckItems([], defaultSelectedItems, 'id'));

      result.current.clearCheckedItems();
      expect(result.current.checkedItems).toEqual([]);
   });
});
