import React from 'react';
import { ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { materialTheme } from './utils';
import CustomAccordion from '@app/components/atoms/Accordion';
import { Chip } from '@app/components/atoms/Chip';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={materialTheme}>
      <div>
        <AppRoutes />
      </div>
      <CustomAccordion accordionLabels={['Label 1', 'Label 2']}>
        <Chip />
        <Chip />
      </CustomAccordion>
    </ThemeProvider>
  );
};

export default App;