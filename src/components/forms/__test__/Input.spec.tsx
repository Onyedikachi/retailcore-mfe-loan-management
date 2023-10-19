/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { InputProps } from '../../atoms';
import { FormControlBase } from '../FormControl';
import { TestForm } from './test.utils';
describe('Component <Input />', () => {
   it('should render an input when control is "input"', () => {
      const inputProps: InputProps = { name: 'inputField', placeholder: 'Input Field' };
      const { container } = render(
         <TestForm>
            <FormControlBase control="input" {...inputProps} />
         </TestForm>
      );
      const inputElement = container.querySelector('input[name="inputField"]') as HTMLInputElement;
      expect(inputElement).toBeInTheDocument();
      expect(inputElement.type).toBe('text');
   });
   it('handles change events correctly for number input', () => {
      const inputProps: InputProps = { name: 'inputField', placeholder: 'Input Field', allow: 'number' };
      const { container } = render(
         <TestForm>
            <FormControlBase control="input" {...inputProps} />
         </TestForm>
      );

      const inputElement = container.querySelector('input[name="inputField"]') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'New Value 12' } });
      expect(inputElement).toHaveValue('12');
   });

   it('handles currency formatting correctly', () => {
      const inputProps: InputProps = { name: 'inputField', placeholder: 'Input Field', currency: true };
      const { container } = render(
         <TestForm>
            <FormControlBase control="input" {...inputProps} />
         </TestForm>
      );

      const inputElement = container.querySelector('input[name="inputField"]') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: '1000000' } });
      expect(inputElement).toHaveValue('1,000,000');
   });

   // it('handles percentage formatting correctly', () => {
   //    const inputProps: InputProps = { name: 'inputField', percentage: true };
   //    const { container } = render(
   //       <TestForm>
   //          <FormControlBase control="input" {...inputProps} />
   //       </TestForm>
   //    );
   //    const inputElement = container.querySelector('input[name="inputField"]') as HTMLInputElement;
   //    fireEvent.change(inputElement, { target: { value: '50' } });
   //    expect(inputElement).toHaveValue('50%');
   // });

   // it('handles ratio formatting correctly', () => {
   //    const inputProps: InputProps = { name: 'inputField', placeholder: 'Input Field', ratio: true };
   //    const { container } = render(
   //       <TestForm>
   //          <FormControlBase control="input" {...inputProps} />
   //       </TestForm>
   //    );
   //    const inputElement = container.querySelector('input[name="inputField"]') as HTMLInputElement;
   //    fireEvent.change(inputElement, { target: { value: '2:1' } });

   //    expect(inputElement).toHaveValue('2:1');
   // });
});
