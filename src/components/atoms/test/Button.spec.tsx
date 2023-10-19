import { render } from '@testing-library/react';
import { Button } from '../Button';
import { renderWithThemeProvider } from './test.utils';
describe('Component <Button/>', () => {
   it('renders a contained primary button', () => {
      const { getByText } = render(
         <Button variant="contained" color="primary">
            Primary Button
         </Button>
      );
      const buttonElement = getByText('Primary Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('MuiButton-containedPrimary');
   });

   it('renders a disabled contained primary button', () => {
      const { getByText } = render(
         <Button variant="contained" color="primary" disabled>
            Disabled Primary Button
         </Button>
      );
      const buttonElement = getByText('Disabled Primary Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('Mui-disabled');
      expect(buttonElement).toHaveClass('MuiButton-containedPrimary');
   });

   it('renders a contained secondary button', () => {
      const { getByText } = render(
         <Button variant="contained" color="secondary">
            Secondary Button
         </Button>
      );
      const buttonElement = getByText('Secondary Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('MuiButton-containedSecondary');
   });

   it('renders a disabled contained secondary button', () => {
      const { getByText } = render(
         <Button variant="contained" color="secondary" disabled>
            Disabled Secondary Button
         </Button>
      );
      const buttonElement = getByText('Disabled Secondary Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('Mui-disabled');
      expect(buttonElement).toHaveClass('MuiButton-containedSecondary');
   });

   it('renders a gray outlined button', () => {
      const { getByText } = renderWithThemeProvider(
         <Button variant="outlined" color="gray">
            Gray Outlined Button
         </Button>
      );
      const buttonElement = getByText('Gray Outlined Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('MuiButton-outlined');
   });

   it('renders a disabled gray outlined button', () => {
      const { getByText } = renderWithThemeProvider(
         <Button variant="outlined" color="gray" disabled>
            Disabled Gray Outlined Button
         </Button>
      );
      const buttonElement = getByText('Disabled Gray Outlined Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('Mui-disabled');
      expect(buttonElement).toHaveClass('MuiButton-outlined');
   });

   it('renders a text primary button', () => {
      const { getByText } = render(
         <Button variant="text" color="primary">
            Primary Text Button
         </Button>
      );
      const buttonElement = getByText('Primary Text Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('MuiButton-textPrimary');
   });

   it('renders a disabled text primary button', () => {
      const { getByText } = render(
         <Button variant="text" color="primary" disabled>
            Disabled Primary Text Button
         </Button>
      );
      const buttonElement = getByText('Disabled Primary Text Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('Mui-disabled');
      expect(buttonElement).toHaveClass('MuiButton-textPrimary');
   });

   it('renders a text secondary button', () => {
      const { getByText } = render(
         <Button variant="text" color="secondary">
            Secondary Text Button
         </Button>
      );
      const buttonElement = getByText('Secondary Text Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('MuiButton-textSecondary');
   });

   it('renders a disabled text secondary button', () => {
      const { getByText } = render(
         <Button variant="text" color="secondary" disabled>
            Disabled Secondary Text Button
         </Button>
      );
      const buttonElement = getByText('Disabled Secondary Text Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('Mui-disabled');
      expect(buttonElement).toHaveClass('MuiButton-textSecondary');
   });

   it('renders a text gray button', () => {
      const { getByText } = renderWithThemeProvider(
         <Button variant="text" color="gray">
            Gray Text Button
         </Button>
      );
      const buttonElement = getByText('Gray Text Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('MuiButton-textGray');
   });

   it('renders a disabled text gray button', () => {
      const { getByText } = renderWithThemeProvider(
         <Button variant="text" color="gray" disabled>
            Disabled Gray Text Button
         </Button>
      );
      const buttonElement = getByText('Disabled Gray Text Button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('Mui-disabled');
      expect(buttonElement).toHaveClass('MuiButton-textGray');
   });

   // it('correctly determines color based on variant', () => {
   //    const { getByText } = render(<Button>Test Button</Button>);
   //    const buttonElement = getByText('Test Button');
   //    expect(buttonElement).toBeInTheDocument();
   //    expect(buttonElement).toHaveClass('MuiButton-containedGray'); // The default color for 'contained' and 'gray'
   // });

   it('correctly uses specified color for a contained button', () => {
      const { getByText } = render(
         <Button variant="contained" color="primary">
            Specified Color
         </Button>
      );
      const buttonElement = getByText('Specified Color');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('MuiButton-containedPrimary'); // 'primary' color
   });

   it('correctly uses specified color for an outlined button', () => {
      const { getByText } = render(
         <Button variant="outlined" color="secondary">
            Specified Color
         </Button>
      );
      const buttonElement = getByText('Specified Color');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('MuiButton-outlinedSecondary'); // 'secondary' color
   });
});
