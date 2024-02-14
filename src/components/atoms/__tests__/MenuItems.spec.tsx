import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuItem } from '../MenuItems';
import { Colors } from '@app/constants';
import { MemoryRouter } from 'react-router-dom';

describe('MenuItem component', () => {
   test('renders MenuItem with label', () => {
      render(<MenuItem label="Test Label" />);
      const menuItem = screen.getByText('Test Label');
      expect(menuItem).toBeInTheDocument();
   });

   test('renders MenuItem with href', () => {
      render(
         <MemoryRouter>
            <MenuItem label="Test Link" href="/test" />
         </MemoryRouter>
      );
      const menuItem = screen.getByText('Test Link');
      expect(menuItem.closest('a')).toHaveAttribute('href', '/test');
   });

   test('renders MenuItem without href', () => {
      render(<MenuItem label="Test Label" />);
      const menuItem = screen.getByText('Test Label');
      expect(menuItem.closest('a')).not.toBeInTheDocument();
   });

   test('calls onClick callback when clicked', () => {
      const onClickMock = jest.fn();
      render(<MenuItem label="Test Click" onClick={onClickMock} />);
      const menuItem = screen.getByText('Test Click');
      fireEvent.click(menuItem);
      expect(onClickMock).toHaveBeenCalled();
   });

   test('applies activeList styles when active', () => {
      render(<MenuItem label="Active Item" className="activeList" />);
      const menuItem = screen.getByText('Active Item');
      expect(menuItem).toHaveStyle(`background-color: ${Colors.LightPrimary}`);
   });

   test('applies hover styles on hover', () => {
      render(<MenuItem label="Test Label" />);
      const menuItem = screen.getByText('Test Label');
      userEvent.hover(menuItem);
      expect(menuItem).toHaveStyle('background-color: #f6f6f6');
   });
});
