/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render } from '@testing-library/react';
import { InputProps, SelectProps, SwitchProps, RadioGroupProps, CheckBoxGroupProps } from '../atoms';
import { FormControlBase } from './FormControl';
import { Formik, Form } from 'formik';
import { Box } from '@mui/system';
import { ObjectAny } from '@app/@types';

describe('Component <FormControlBase />', () => {
   it('should render an input when control is "input"', () => {
      const inputProps: InputProps = {
         type: 'text',
         name: 'inputField',
         placeholder: 'Input Field',
      };

      const { container } = render(
         <TestForm>
            <FormControlBase control="input" {...inputProps} />
         </TestForm>
      );

      const inputElement = container.querySelector('input[name="inputField"]') as HTMLInputElement;
      expect(inputElement).toBeInTheDocument();
      expect(inputElement.type).toBe('text');
   });

   it('should render a select input when control is "select"', () => {
      const selectProps: SelectProps = {
         name: 'selectField',
         placeholder: 'Select Field',
         options: ['option1', 'option2'],
      };

      const { container } = render(
         <TestForm>
            <FormControlBase control="select" {...selectProps} />
         </TestForm>
      );

      const selectElement = container.querySelector('#selectField') as HTMLSelectElement;
      expect(selectElement).toBeInTheDocument();
   });

   it('should render a switch when control is "switch"', () => {
      const switchProps: SwitchProps = {
         name: 'switchField',
         checked: true,
         onChange: jest.fn(),
      };

      const { container } = render(
         <TestForm>
            <FormControlBase control="switch" {...switchProps} />
         </TestForm>
      );

      const switchElement = container.querySelector('input[name="switchField"]') as HTMLInputElement;
      expect(switchElement).toBeInTheDocument();
      expect(switchElement.type).toBe('checkbox');
      expect(switchElement.checked).toBe(true);
   });
   it('should render radio group when control is "radio"', () => {
      const radioProps: RadioGroupProps = {
         name: 'radioGroup',
         options: [
            { label: 'option1', value: 'option1' },
            { label: 'option2', value: 'option2' },
         ],
      };

      const { container } = render(
         <TestForm>
            <FormControlBase control="radio" {...radioProps} />
         </TestForm>
      );

      const radioGroupElement = container.querySelector('input[name="radioGroup"]') as HTMLInputElement;
      expect(radioGroupElement).toBeInTheDocument();
      expect(radioGroupElement.type).toBe('radio');
   });

   it('should render checkbox group when control is "checkboxGroup"', () => {
      const checkboxGroupProps: CheckBoxGroupProps = {
         name: 'checkboxGroup',
         options: ['option1', 'option2', 'option3'],
      };

      const { container } = render(
         <TestForm>
            <FormControlBase control="checkboxGroup" {...checkboxGroupProps} />
         </TestForm>
      );

      const checkboxGroupElements = container.querySelectorAll('input[name="checkboxGroup"]');
      expect(checkboxGroupElements).toHaveLength(3);
      checkboxGroupElements.forEach((checkboxElement) => {
         expect(checkboxElement.tagName).toBe('INPUT');
      });
   });

   // Add more tests for other controls (checkboxGroup and radio) if necessary
});

const TestForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <Box>
         <Formik initialValues={{ input: '' }} onSubmit={(values: ObjectAny) => {}}>
            {() => {
               return <Form>{children}</Form>;
            }}
         </Formik>
      </Box>
   );
};
