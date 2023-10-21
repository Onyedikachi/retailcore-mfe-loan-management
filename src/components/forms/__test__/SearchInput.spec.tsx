/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { SearchInput } from '../../atoms';

describe('Component <SearchInput />', () => {
   it('renders the input field with the given placeholder', () => {
      const placeholder = 'Search...';
      const { container } = render(<SearchInput placeholder={placeholder} handleSearch={() => {}} />);
      const inputElement = container.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
      expect(inputElement).toBeInTheDocument();
   });

   it('calls handleSearch when input value changes', async () => {
      const handleSearchMock = jest.fn();
      const placeholder = 'Search...';
      const { container } = render(
         <SearchInput handleSearch={handleSearchMock} placeholder={placeholder} debounceTime={0} />
      );
      const inputElement = container.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'test' } });

      await waitFor(() => {
         expect(handleSearchMock).toHaveBeenCalledWith('test');
      });
   });
});
