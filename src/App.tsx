import React from 'react';
import { ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { materialTheme } from './utils';
import Accordion from '@app/components/atoms/Accordion';
import { Chip } from '@app/components/atoms/Chip';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={materialTheme}>
      <div>
        <AppRoutes />
      </div>
      <Accordion text="Accordion 1" component={<Chip />} />
      <Accordion text="Accordion 2" component={<Chip />} />
    </ThemeProvider>
  );
};

export default App;