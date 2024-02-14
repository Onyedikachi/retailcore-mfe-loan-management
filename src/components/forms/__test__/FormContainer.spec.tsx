import React from 'react';
import { render, screen } from '@testing-library/react';
import FormContainer from '../FormContainer';

describe('FormContainer component', () => {
   test('renders without errors', () => {
      render(
         <FormContainer>
            <div>Child Component</div>
         </FormContainer>
      );
      expect(screen.getByTestId('form-container')).toBeInTheDocument();
   });

   test('renders with default minHeight when not provided', () => {
      render(
         <FormContainer>
            <div>Child Component</div>
         </FormContainer>
      );
      const formContainer = screen.getByTestId('form-container');
      expect(formContainer).not.toHaveStyle('min-height: undefined');
   });

   test('renders with specified minHeight when provided', () => {
      const minHeight = '200px';

      render(
         <FormContainer minHeight={minHeight}>
            <div>Child Component</div>
         </FormContainer>
      );

      const formContainer = screen.getByTestId('form-container');
      expect(formContainer).toHaveStyle(`min-height: ${minHeight}`);
   });

   test('renders children within the Box', () => {
      render(
         <FormContainer>
            <div data-testid="child-element">Child Element</div>
         </FormContainer>
      );
      expect(screen.getByTestId('child-element')).toBeInTheDocument();
   });

   test('applies boxShadow style', () => {
      render(
         <FormContainer>
            <div>Child Component</div>
         </FormContainer>
      );
      const formContainer = screen.getByTestId('form-container');
      expect(formContainer).toHaveStyle('box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25)');
   });

   test('applies padding and margin styles', () => {
      render(
         <FormContainer>
            <div>Child Component</div>
         </FormContainer>
      );
      const formContainer = screen.getByTestId('form-container');
      expect(formContainer).toHaveStyle('padding: 24px');
      expect(formContainer).toHaveStyle('margin: 8px');
   });

   test('applies borderRadius style', () => {
      render(
         <FormContainer>
            <div>Child Component</div>
         </FormContainer>
      );
      const formContainer = screen.getByTestId('form-container');
      expect(formContainer).toHaveStyle('border-radius: 8px');
   });
});
