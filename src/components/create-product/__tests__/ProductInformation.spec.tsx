import { formTestUtil } from '@app/test/form-util';
import { ProductInformation } from '../credit-personal-loan';
import { CommonFormFieldNames } from '@app/constants';
import { CreateProductSetup, act, fireEvent, render, silentError } from '@app/test/setup';
import { useRequestData } from 'react-http-query';
import mockCurrency from '@app/test/mocks/currency.json';
import { InputFieldNames } from '@app/utils/validators/personal-loan/product-info';

const buttonMeta = {
   selector: '#product-info-submit-next',
   disabled: true,
};

jest.mock('react-http-query', () => {
   const originalModule = jest.requireActual('react-http-query'); // Get the original module
   return {
      ...originalModule, // Spread the original module to keep other functions intact
      useRequestData: jest.fn(), // Mock the specific function
   };
});

const productCurrencySelector = `input[name=${CommonFormFieldNames.PRODUCT_CURRENCY}]`;
const minLoanTenure = `input[name=${InputFieldNames.MAX_LOAN_TENURE_NUM}]`;
const maxLoanTenure = `input[name=${InputFieldNames.MAX_LOAN_TENURE_NUM}]`;
const maxPrincipalSelector = `input[name=${CommonFormFieldNames.MAX_LOAN_PRINCIPAL}]`;
const minPrincipalSelector = `input[name=${CommonFormFieldNames.MIN_LOAN_PRINCIPAL}]`;

describe('<ProductionInformation>', () => {
   beforeEach(() => {
      fetchMock.resetMocks();
   });

   /* eslint-disable no-console */
   let errorConsole: any | null = null;
   let warnConsole: any | null = null;

   beforeAll(() => {
      errorConsole = silentError(['was not wrapped in act(...)']);
      warnConsole =  silentError(['You have provided an out-of-range value'], 'warn');
   });

   afterAll(() => {
      console.error = errorConsole;
      console.warn = warnConsole;
   });
   /* eslint-enable no-console */

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
            testDescription: 'Should display `Description is required` when input is empty after focus',
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

      formTestUtil(
         <CreateProductSetup>
            <ProductInformation />
         </CreateProductSetup>
      )([
         {
            testDescription: 'Should have NGN set as default value',
            selector: productCurrencySelector,
            expectedInputValue: 'NGN',
            buttonStatus: buttonMeta,
            acts: [],
         },
      ]);

      it('should update currency type on all currency fields when currency type changes', () => {
         const { container, getAllByRole, getAllByText } = render(
            <CreateProductSetup>
               <ProductInformation />
            </CreateProductSetup>
         );

         const currencySelectElement = container.querySelector(
            `#mui-component-select-${CommonFormFieldNames.PRODUCT_CURRENCY}`
         );
         if (!currencySelectElement) throw Error('Currency input not found');

         act(() => {
            fireEvent.mouseDown(currencySelectElement);
         });

         const { abbreviation } = mockCurrency.results[3];
         const option = getAllByRole('option').find((option) => option.dataset?.['value'] === abbreviation);
         if (!option) throw Error('Currency option not found');

         act(() => {
            fireEvent.click(option);
         });

         // Expect max principal loan to have currency abbr. updated.
         // Expect min principal loan to have currency abbr. updated.
         // Expect the currency select field to have selected currency abbr. as set value.
         expect(getAllByText(abbreviation).length).toBe(4);
      });

      describe('Min Loan Tenure', () => {
         formTestUtil(
            <CreateProductSetup>
               <ProductInformation />
            </CreateProductSetup>
         )([
            {
               testDescription: 'Should have tenure value set to 1 as default',
               selector: productCurrencySelector,
               expectedInputValue: 'NGN',
               buttonStatus: buttonMeta,
               acts: [],
            },
         ]);
      });
   });
});
