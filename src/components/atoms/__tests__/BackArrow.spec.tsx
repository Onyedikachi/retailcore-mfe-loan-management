import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { BackArrow } from '../BackArrow';

describe('BackArrow component', () => {
   test('renders without errors', () => {
      render(
         <Router>
            <BackArrow />
         </Router>
      );
      expect(screen.getByRole('link')).toBeInTheDocument();
   });

   test('renders text when provided', () => {
      render(
         <Router>
            <BackArrow text="Back" />
         </Router>
      );
      expect(screen.getByText('Back')).toBeInTheDocument();
   });

   test('renders IconButton', () => {
      render(
         <Router>
            <BackArrow />
         </Router>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
   });
});
