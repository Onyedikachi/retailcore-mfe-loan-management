import { render } from '@testing-library/react';
import { GeneralAppSetup } from '@app/tests/setup';
import { TableHeading } from '../TableHeading';


describe('<TableHeading Component/>', () => {
  
    const mockHandleSearch = jest.fn();
    const mockHandleRefresh = jest.fn();
    const mockHandleDownload = jest.fn();
    const placeholderText = 'Search Placeholder';

   it('should render TableHeading Component bodyprop', () => {
      const { getByText, getByPlaceholderText } = render(
         <GeneralAppSetup>
          <TableHeading
           handleSearch={mockHandleSearch}
           handleRefresh={mockHandleRefresh}
           handleDownload={mockHandleDownload}
           searchPlaceholder={placeholderText}
          />
         </GeneralAppSetup>
      );

      const searchInput = getByPlaceholderText(placeholderText);
      expect(searchInput).toBeInTheDocument();

      const refreshButton = getByText('Refresh');
      expect(refreshButton).toBeInTheDocument();

      const downloadButton = getByText('Download');
      expect(downloadButton).toBeInTheDocument();
    
   });

});
