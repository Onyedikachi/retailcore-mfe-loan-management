/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render } from '@testing-library/react';
import { InputProps, SelectProps, SwitchProps } from '../atoms';
import { FormControlBase } from './FormControl';
import { Formik, Form } from 'formik';
import { Box } from '@mui/system';

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

      const inputElement = container.querySelector('#inputField') as HTMLInputElement;
      expect(inputElement).toBeInTheDocument();
      expect(inputElement.type).toBe('text');
      expect(inputElement.name).toBe('inputField');
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
      expect(selectElement.name).toBe('selectField');
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

      const switchElement = container.querySelector('#switchField') as HTMLInputElement;
      expect(switchElement).toBeInTheDocument();
      expect(switchElement.type).toBe('checkbox');
      expect(switchElement.name).toBe('switchField');
      expect(switchElement.checked).toBe(true);
   });
});

type inputValue = { [key: string]: any };

const TestForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <Box>
         <Formik initialValues={{ input: '' }} onSubmit={(values: inputValue) => {}}>
            {(formik) => {
               return <Form>{children}</Form>;
            }}
         </Formik>
      </Box>
   );
};
