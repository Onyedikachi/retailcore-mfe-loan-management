import { render } from '@testing-library/react';
import { GeneralAppSetup } from '@app/tests/setup';
import { CollateralSelected } from '../CollateralSelected';
import { Formik } from 'formik';

describe('<Colateral Select />', () => {
   const mockCollateral = 'Collateral';
   const mockName = 'MR PAUL';
   const mockHandleRemove = jest.fn();

   it('should render collateralselected bodyprop', () => {
      const { getByText, getByPlaceholderText } = render(
         <Formik initialValues={{ input: '' }} onSubmit={() => {}}>
            <GeneralAppSetup>
               <CollateralSelected
                  collateral={mockCollateral}
                  name={mockName}
                  handleRemove={mockHandleRemove}
               />
            </GeneralAppSetup>
         </Formik>
      );

      const collateralTitle = getByText('Collateral');
      expect(collateralTitle).toBeInTheDocument();

      const marketValueInput = getByPlaceholderText('Enter market value');
      expect(marketValueInput).toBeInTheDocument();
   });

   it('should allow user input value ', () => {
      const { getByPlaceholderText } = render(
         <Formik initialValues={{ input: '' }} onSubmit={() => {}}>
            <GeneralAppSetup>
               <CollateralSelected
                  collateral={mockCollateral}
                  name={mockName}
                  handleRemove={mockHandleRemove}
               />
            </GeneralAppSetup>
         </Formik>
      );
      const marketValueInput = getByPlaceholderText('Enter market value');

      expect(marketValueInput).toBeInTheDocument();
      expect(marketValueInput).toHaveAttribute('placeholder', 'Enter market value');
      expect(marketValueInput).toHaveAttribute('type', 'text');
      expect(marketValueInput).toHaveValue('');
      expect(marketValueInput).toBeInTheDocument();
   });

   it('should allow user upload file ', () => {
      const { getByText } = render(
         <Formik initialValues={{ input: '' }} onSubmit={() => {}}>
            <GeneralAppSetup>
               <CollateralSelected
                  collateral={mockCollateral}
                  name={mockName}
                  handleRemove={mockHandleRemove}
               />
            </GeneralAppSetup>
         </Formik>
      );

      const uploadFile = getByText('Click to upload');
      expect(uploadFile).toBeInTheDocument();
   });
});
