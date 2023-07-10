import { ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { materialTheme } from './utils';

const App = () => {
   return (
      <ThemeProvider theme={materialTheme}>
         <AppRoutes />
      </ThemeProvider>
   );
};

export default App;
