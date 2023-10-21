import { renderHook } from '@testing-library/react-hooks';
import { useId } from '../useId';

describe('useId', () => {
   it('should generate a unique ID', () => {
      const { result } = renderHook(() => useId());
      const id1 = result.current;

      const { result: result2 } = renderHook(() => useId());
      const id2 = result2.current;

      expect(id1).not.toEqual(id2);
   });

   it('should generate a valid UUID-like ID', () => {
      const { result } = renderHook(() => useId());
      const id = result.current;

      const uuidRegex = /^[0-9a-f]{32}$/;
      expect(uuidRegex.test(id)).toBe(true);
   });
});
