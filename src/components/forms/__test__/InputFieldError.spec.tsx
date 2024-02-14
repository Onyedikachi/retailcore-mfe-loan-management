import { render, screen } from '@testing-library/react';
import { Colors } from '@app/constants';
import { Box } from '@mui/system';
import { InputErrorText, InputSuccessText } from '../InputFieldError';

describe('InputTextComponents', () => {
   describe('InputErrorText', () => {
      test('renders error text with red color and 12px font size', () => {
         render(<InputErrorText errorText="Error Message" />);
         const errorTextElement = screen.getByText('Error Message');
         expect(errorTextElement).toBeInTheDocument();
         expect(errorTextElement).toHaveStyle({
            color: 'red',
            fontSize: '12px',
         });
      });

      test('applies custom styles to error text', () => {
         const customStyle = { fontWeight: 'bold' };
         render(<InputErrorText errorText="Error Message" sx={customStyle} />);
         const errorTextElement = screen.getByText('Error Message');
         expect(errorTextElement).toHaveStyle({
            fontWeight: 'bold',
         });
      });
   });

   describe('InputSuccessText', () => {
      test('renders success text with success color and 12px font size', () => {
         render(<InputSuccessText successText="Success Message" />);
         const successTextElement = screen.getByText('Success Message');
         expect(successTextElement).toBeInTheDocument();
         expect(successTextElement).toHaveStyle({
            color: Colors.Success,
            fontSize: '12px',
         });
      });
   });
});
