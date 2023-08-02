import { render } from '@testing-library/react';
import { Table } from '../Table';
import { GeneralAppSetup } from '@app/test/setup';

describe('<Table />', () => {
   it('should not render table header if only bodyProps is given.', () => {
      const { getByText, container } = render(
         <GeneralAppSetup>
            <Table bodyProps={{ rows: [{ name: 'Name 1', age: 1 }] }} />
         </GeneralAppSetup>
      );

      expect(getByText('Name 1')).toBeInTheDocument();
      expect(getByText('Name 1')).toHaveClass('MuiTableCell-body');
      expect(container.querySelector('.MuiTableHead-root')).toBeNull();
   });

   it('should render table header if headerProps is given', () => {
      const { getByText } = render(
         <GeneralAppSetup>
            <Table
               headerProps={{
                  data: [
                     { key: 'name', element: 'Name' },
                     { key: 'age', element: 'Age' },
                  ],
               }}
               bodyProps={{ rows: [{ name: 'Sample', age: 1 }] }}
            />
         </GeneralAppSetup>
      );

      expect(getByText('Sample')).toBeInTheDocument();
      expect(getByText('Name')).toBeInTheDocument();
      expect(getByText('Name')).toHaveClass('MuiTableCell-head');
   });

   it('should add row count column if s/n is one of the headerProps data key', () => {
      const { getByText } = render(
         <GeneralAppSetup>
            <Table
               headerProps={{
                  data: [{ key: 'sn' }, { key: 'name', element: 'Name' }, { key: 'age', element: 'Age' }],
               }}
               bodyProps={{
                  rows: [
                     { name: 'Sample', age: 99 },
                     { name: 'Sample 3', age: 88 },
                  ],
               }}
            />
         </GeneralAppSetup>
      );

      expect(getByText('1')).toHaveClass('MuiTableCell-body');
      expect(getByText('2')).toHaveClass('MuiTableCell-body');
   });

   it('should add icon when supported icon name is given', () => {
      const { getByTestId } = render(
         <GeneralAppSetup>
            <Table
               headerProps={{
                  data: [
                     { key: 'name', element: 'Name', leftIcon: 'filter' },
                     { key: 'age', element: 'Age' },
                  ],
               }}
               bodyProps={{ rows: [{ name: 'Sample', age: 99 }] }}
            />
         </GeneralAppSetup>
      );

      expect(getByTestId('Filter1OutlinedIcon')).toBeInTheDocument();
   });
});
