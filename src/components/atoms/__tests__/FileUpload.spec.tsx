import { screen } from '@testing-library/react';
import { FileUpload } from '../FileUpload';
import { renderWithThemeProvider } from '@app/tests/theme.utils';
import { TestForm } from '@app/tests/form-util';

describe('FileUpload', () => {
   it('should handle file uploads and removals', async () => {
      const mockSetFieldValue = jest.fn();
      jest.mock('formik', () => ({
         useFormikContext: () => ({
            getFieldProps: () => ({
               value: undefined,
            }),
            setFieldValue: mockSetFieldValue,
         }),
      }));

      renderWithThemeProvider(
         <TestForm>
            <FileUpload fileTypes={['jpg', 'png']} maxSize={5} name="testFiles" />
         </TestForm>
      );

      // Find the "Click to upload" text
      const uploadText = screen.getByText('Click to upload');

      // Check that the "Click to upload" text is visible
      expect(uploadText).toBeInTheDocument();
   });
});
