import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import { SelectInput } from '../select/Select'; // Update the path as needed

describe('SelectInput component', () => {
   const options = ['Option 1', 'Option 2', 'Option 3'];
   const placeholder = 'Select an option';

   test('renders without errors', () => {
      render(
         <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
               <SelectInput name="test" options={options} placeholder={placeholder} />
            </Form>
         </Formik>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
   });

   test('renders the placeholder when no value is selected', () => {
      render(
         <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
            <Form>
               <SelectInput name="test" options={options} placeholder={placeholder} />
            </Form>
         </Formik>
      );
      expect(screen.getByText(placeholder)).toBeInTheDocument();
   });
});
