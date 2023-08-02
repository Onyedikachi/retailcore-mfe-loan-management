import { StepperProvider } from '@app/providers';
import { CreateProductProvider } from '@app/providers/create-product';
import { GlobalTheme } from '@app/utils';
import { ThemeProvider } from '@mui/material';
import fetchMock from 'jest-fetch-mock';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

// Set up the fetch mock
fetchMock.enableMocks();

jest.mock('react-http-query', () => ({
   useRequestData: jest.fn(),
}));

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
