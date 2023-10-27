import { AddButton } from '../AddButton';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { fireEvent } from '@testing-library/react';
import { Colors } from '@app/constants/colors';

describe('AddButton Component', () => {
   it('renders the button with the provided text', () => {
      const buttonText = 'Add Item';
      const { getByText } = renderWithThemeProvider(<AddButton text={buttonText} />);
      const buttonElement = getByText(buttonText);
      expect(buttonElement).toBeInTheDocument();
   });

   it('calls the onClick function when the button is clicked', () => {
      const onClickMock = jest.fn();
      const buttonText = 'Add Item';
      const { getByText } = renderWithThemeProvider(<AddButton text={buttonText} onClick={onClickMock} />);
      const buttonElement = getByText(buttonText);

      fireEvent.click(buttonElement);

      expect(onClickMock).toHaveBeenCalledTimes(1);
   });

   it('calls the onMouseDown function when the button is pressed', () => {
      const onMouseDownMock = jest.fn();
      const buttonText = 'Add Item';
      const { getByText } = renderWithThemeProvider(
         <AddButton text={buttonText} onMouseDown={onMouseDownMock} />
      );
      const buttonElement = getByText(buttonText);

      fireEvent.mouseDown(buttonElement);

      expect(onMouseDownMock).toHaveBeenCalledTimes(1);
   });

   it('renders the button with the provided color', () => {
      const buttonText = 'Add Item';
      const color = 'primary';
      const { getByText } = renderWithThemeProvider(<AddButton text={buttonText} color={color} />);
      const buttonElement = getByText(buttonText);
      expect(buttonElement).toHaveStyle(`color: ${Colors.Primary}`);
   });
});
