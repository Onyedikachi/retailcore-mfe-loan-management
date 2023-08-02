import { renderHook } from '@testing-library/react-hooks';
import useDebounce from '../useDebounce';
import { act, delay } from '@app/test/setup';
import { useDebounceRequests } from '../useDebounceRequest';

describe('useDebounce', () => {
   it('should set text after set timeout', async () => {
      const { result } = renderHook(() => useDebounce(500));

      const { setDebouncedValue } = result.current;
      act(() => setDebouncedValue('value'));

      expect(result.current.debouncedValue).toBe(undefined);

      // Delay for 200ms & value should remain null
      await delay(200);
      expect(result.current.debouncedValue).toBe(undefined);

      await delay(310);
      expect(result.current.debouncedValue).toBe('value');
   });
});

describe('useDebounceRequest', () => {
   const searchUrl = (searchText: string) => `https://example.com/search/${searchText}`;

   afterEach(() => {
      fetchMock.resetMocks();
   });

   it('should make network call after set timeout elapse, based on input changes', async () => {
      const { result } = renderHook(() => useDebounceRequests(searchUrl(''), 500));
      const { setRequestPath } = result.current;

      expect(fetchMock).not.toHaveBeenCalled();

      await delay(200);
      act(() => setRequestPath(searchUrl('search-text')));

      await delay(400);
      expect(fetchMock).not.toHaveBeenCalled();

      await delay(150);
      expect(fetchMock).toBeCalledTimes(1);
      expect(fetchMock).toBeCalledWith(searchUrl('search-text'), expect.any(Object));
   });

   it('should make network call with set request body', async () => {
      const { result } = renderHook(() => useDebounceRequests(searchUrl(''), 50));
      const { setRequestBody } = result.current;

      expect(fetchMock).not.toHaveBeenCalled();

      act(() => setRequestBody({ data: {} }));

      await delay(60);

      expect(fetchMock).toHaveBeenCalled();
      expect(fetchMock).toHaveBeenCalledWith(
         searchUrl(''),
         expect.objectContaining({ body: JSON.stringify({ data: {} }) })
      );
   });

   it('should return expected response after network call', async () => {
      fetchMock.mockResolvedValue({
         url: 'https://example.com/search/',
         body: JSON.stringify({ data: 'debounce' }) as any,
      } as any);
      fetchMock.mockResponseOnce(JSON.stringify({ data: 'debounce' }));

      const { result } = renderHook(() => useDebounceRequests(searchUrl(''), 50));

      await delay(60);

      console.log({ fetchMock });
      expect(fetchMock).toHaveBeenCalled();
      expect(result.current.response).toStrictEqual({ data: 'debounce' });
   });
});
