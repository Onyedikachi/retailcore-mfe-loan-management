import { render, screen, act } from '@testing-library/react';
import { AlertSnackbar } from '../AlertSnackbar';

describe('AlertSnackbar Component', () => {
   it('renders with provided message and title', () => {
      render(<AlertSnackbar message="Test message" title="Test title" />);

      expect(screen.getByText('Test title')).toBeInTheDocument();
      expect(screen.getByText('Test message')).toBeInTheDocument();
   });

   it('closes the alert after a specified autoHideDuration', async () => {
      render(<AlertSnackbar message="Test message" autoHideDuration={100} />);

      await act(async () => {
         await new Promise((resolve) => setTimeout(resolve, 200));
      });

      const alert = screen.queryByText('Test title');
      expect(alert).not.toBeInTheDocument();
   });
});
