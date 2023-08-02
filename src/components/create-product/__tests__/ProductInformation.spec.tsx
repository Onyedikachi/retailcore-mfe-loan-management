import { formTestUtil } from '@app/test/form-util';
import { ProductInformation } from '../credit-personal-loan';
import { CommonFormFieldNames } from '@app/constants';
import { CreateProductSetup } from '@app/test/setup';
import { useRequestData } from 'react-http-query';
import mockCurrency from '@app/test/mocks/currency.json';

const buttonMeta = {
   selector: '#product-info-submit-next',
   disabled: true,
};

jest.doMock('react-http-query', () => {
   const originalModule = jest.requireActual('react-http-query'); // Get the original module
   return {
     ...originalModule, // Spread the original module to keep other functions intact
     useRequestData: jest.fn(), // Mock the specific function
   };
});

describe('<ProductionInformation>', () => {
   beforeEach(() => {
      fetchMock.resetMocks();
   });

   describe('Product Name', () => {
      const productNameSelector = `input[name=${CommonFormFieldNames.PRODUCT_NAME}]`;

      formTestUtil(
         <CreateProductSetup>
            <ProductInformation />
         </CreateProductSetup>
      )([
         {
            testDescription: 'Should show product name count correctly',
            selector: productNameSelector,
            expectedText: '3/50',
            buttonStatus: buttonMeta,
            acts: [{ typeText: 'thy' }],
         },
         {
            testDescription: 'Should display `Product name is required` when input is empty after focus',
            selector: productNameSelector,
            expectedText: 'Product name is required',
            buttonStatus: buttonMeta,
            acts: [{ typeText: 'product' }, { clear: true }, { blur: true }],
         },
         {
            testDescription: 'Should not allow product name input more than 50 characters in length',
            selector: productNameSelector,
            expectedTextLength: 50,
            acts: [{ typeText: 'i'.repeat(51) }],
         },
      ]);
   });

   describe('Product Description', () => {
      const productDescriptionSelector = `textarea[name=${CommonFormFieldNames.DESCRIPTION}]`;

      formTestUtil(
         <CreateProductSetup>
            <ProductInformation />
         </CreateProductSetup>
      )([
         {
            testDescription:
               'Should display `Description is required` when input is empty after focus',
            selector: productDescriptionSelector,
            expectedText: 'Description is required',
            buttonStatus: buttonMeta,
            acts: [{ typeText: 'product' }, { clear: true }, { blur: true }],
         },
      ]);
   });

   describe('Product Currency', () => {
      beforeEach(() => {
         (useRequestData as jest.Mock<unknown, any>).mockReturnValue(mockCurrency);
      });

      afterEach(() => {
         (useRequestData as jest.Mock<unknown, any>).mockReset();
      });

      const productCurrencySelector = `input[name=${CommonFormFieldNames.PRODUCT_CURRENCY}]`;

      formTestUtil(
         <CreateProductSetup>
            <ProductInformation />
         </CreateProductSetup>
      )([
         {
            testDescription:
               'Should have NGN set as default value',
            selector: productCurrencySelector,
            expectedInputValue: 'NGN',
            buttonStatus: buttonMeta,
            acts: []
         },
      ]);
   });
});
