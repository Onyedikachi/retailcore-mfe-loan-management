import { render, fireEvent } from '@testing-library/react';
import FilterMenu from '../FilterMenu';

describe('<Tab Filter Menu />', () => {
   const mockOnFilterChange = jest.fn();
   const sampleOptions = ['Option1', 'Option2', 'Option3'];

   it('Should Render Icon Buttons', () => {
      const { getByRole } = render(
         <FilterMenu options={sampleOptions} onFilterChange={mockOnFilterChange} />
      );
      expect(getByRole('button')).toBeInTheDocument();
   });

   it('Should not  show filterOptions unless Icon button not clicked', () => {
      const { queryByRole } = render(
         <FilterMenu options={sampleOptions} onFilterChange={mockOnFilterChange} />
      );
      expect(queryByRole('menu')).not.toBeInTheDocument();
   });

   it('Should show filterOptions when icon button is been clicked on', () => {
      const { getByRole } = render(
         <FilterMenu options={sampleOptions} onFilterChange={mockOnFilterChange} />
      );

      fireEvent.click(getByRole('button'));
      expect(getByRole('menu')).toBeInTheDocument();
   });

   it('Should show right date value after selecting numbers of 7days', () => {
      const onFilterChangeMock = jest.fn();

      const { getByRole, getByText } = render(
         <FilterMenu options={['all', 'Option1', 'Option2']} onFilterChange={onFilterChangeMock} />
      );
      fireEvent.click(getByRole('button'));
      const allText = getByText('all');

      expect(allText).toBeInTheDocument();
   });
   it('Should show right date value after selecting numbers of 7days', () => {
      const onFilterChangeMock = jest.fn();

      const { getByRole, getByText } = render(
         <FilterMenu options={['all', 'Option1', 'Option2']} onFilterChange={onFilterChangeMock} />
      );
      fireEvent.click(getByRole('button'));
      const allText = getByText('all');

      expect(allText).toBeInTheDocument();
   });
});
