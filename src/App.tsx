import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';
import Accordion from './components/accordion/Accordion';
import { Chip } from './components/atoms/Chip';

const App = () => {
   return (
      <ThemeProvider theme={GlobalTheme}>
         <CssBaseline />
         <AppRoutes />
         <Accordion accordionLabels={['Label 1', 'Label 2']}>
            <Chip />
            <Chip />
         </Accordion>
      </ThemeProvider>
   );
};

export default App;
