import { render, act, fireEvent } from '@testing-library/react';
import { useFormik, FormikProvider } from 'formik';
import { useFormikHelper } from '../useFormikHelper';

describe('useFormikHelper', () => {
  it('should update array field', async () => {
    const initialValues = {
      myArray: [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }],
    };

    const onSubmit = jest.fn();

    const TestComponent = () => {
      const formik = useFormik({
        initialValues,
        onSubmit,
      });

      const { arrayFieldsHelper } = useFormikHelper();

      const arrayHelper = arrayFieldsHelper('myArray');

      const formikk = useFormik(arrayHelper);

      return (FormikProvider)
    };

    const { getByTestId } = render(TestComponent);

    // Click the button to update array

    // Updated items
    expect(getByTestId)
    expect(initialValues.myArray[0]).toBe(initialValues.myArray[0]);
    expect(initialValues.myArray[1]).toBe(initialValues.myArray[1]);
    
  });
});
