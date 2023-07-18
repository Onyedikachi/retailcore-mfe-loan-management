import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';
import Accordion from './components/atoms/Accordion'
import { Chip } from './components/atoms/Chip'
import NestedDropdown from './components/atoms/NestedDropdown'
import AddIcon from '@mui/icons-material/Add';



const App = () => {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <CssBaseline />
      <AppRoutes />
      <Accordion accordionLabels={['Label 1', 'Label 2']}>
        <Chip />
        <Chip />
      </Accordion>

      <NestedDropdown/>      
      </ThemeProvider>
  );
};

export default App;