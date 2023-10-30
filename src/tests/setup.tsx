import { StepperProvider } from '@app/providers';
import { CreateProductProvider } from '@app/providers/create-product';
import { GlobalTheme } from '@app/utils';
import { ThemeProvider } from '@mui/material';
import fetchMock from 'jest-fetch-mock';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

// Set up the fetch mock
fetchMock.enableMocks();

export const httpQueryMock = (fnName: string) => {
   jest.mock('react-http-query', () => ({
      useRequestData: jest.fn(),
   }));

   jest.doMock('react-http-query', () => {
      const originalModule = jest.requireActual('react-http-query'); // Get the original module
      return {
         ...originalModule, // Spread the original module to keep other functions intact
         [fnName]: jest.fn(), // Mock the specific function
      };
   });
};

export const GeneralAppSetup = ({ children }: { children: React.ReactNode }) => {
   return (
      <StrictMode>
         <ThemeProvider theme={GlobalTheme}>{children}</ThemeProvider>
      </StrictMode>
   );
};

export const CreateProductSetup = ({ children }: { children: React.ReactNode }) => {
   return (
      <GeneralAppSetup>
         <MemoryRouter>
            <StepperProvider>
               <CreateProductProvider>{children}</CreateProductProvider>
            </StepperProvider>
         </MemoryRouter>
      </GeneralAppSetup>
   );
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export * from '@testing-library/react';

/* eslint-disable no-console */
export const silentError = (searchMessage: Array<string>, consoleType: 'warn' | 'error' = 'error') => {
   const originalConsole = console[consoleType];

   console[consoleType] = (consoleMessage, ...args) => {
      // Check if the warning message contains the desired string
      if (searchMessage.every((message) => !consoleMessage.includes(message))) {
         // Log the warning only if it contains the desired string
         originalConsole(consoleMessage, ...args);
      }
   };

   return originalConsole;
};
/** eslint-enable no-console */

export { fetchMock };
