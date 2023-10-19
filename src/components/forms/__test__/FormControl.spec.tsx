/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react';
import {
   SelectProps,
   SwitchProps,
   RadioGroupProps,
   CheckBoxGroupProps,
   AutocompleteProps,
} from '../../atoms';
import { FormControlBase } from '../FormControl';
import userEvent from '@testing-library/user-event';
import { TextField, AutocompleteRenderInputParams } from '@mui/material';
import { TestForm } from './test.utils';

describe('Component <FormControlBase />', () => {
 
   describe('Component <Select />', () => {
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
   });
   describe('Component <Switch />', () => {
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
   });
   describe('Component <RadioGroup />', () => {
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
   });
   describe('Component <CheckBoxGroup />', () => {
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
   });
   describe('Component <Autocomplete />', () => {
      it('should render the Autocomplete component', () => {
         const autocompleteProps: AutocompleteProps = {
            name: 'autocompleteField',
            options: ['option1', 'option2', 'option3'],
            renderInput: (params: AutocompleteRenderInputParams) => (
               <TextField {...params} variant="standard" />
            ),
         };

         render(
            <TestForm>
               <FormControlBase control="autocomplete" {...autocompleteProps} />
            </TestForm>
         );

         const autocompleteInput = screen.getByTestId('autocomplete-autocompleteField');
         expect(autocompleteInput).toBeInTheDocument();
      });

      it('should select an option from the Autocomplete dropdown', async () => {
         const options = [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
         ];
         const autocompleteProps: AutocompleteProps = {
            name: 'autocompleteField',
            options: options,
            renderInput: (params: AutocompleteRenderInputParams) => (
               <TextField {...params} variant="standard" />
            ),
         };

         render(
            <TestForm>
               <FormControlBase control="autocomplete" {...autocompleteProps} />
            </TestForm>
         );

         const autocompleteInput = screen.getByRole('combobox');

         await userEvent.type(autocompleteInput, 'Option');

         // Click the first option from the dropdown
         const option1 = screen.getByText('Option 1');
         await userEvent.click(option1);

         expect(autocompleteInput).toHaveValue('Option 1');
      });
   });
});

