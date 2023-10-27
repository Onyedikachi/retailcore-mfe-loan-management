import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { GlobalTheme } from '@app/utils';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
   return <ThemeProvider theme={GlobalTheme}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
   render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as renderWithThemeProvider };
