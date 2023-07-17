import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';

const App = () => {
   return (
      <ThemeProvider theme={GlobalTheme}>
         <CssBaseline />
         <AppRoutes />
      </ThemeProvider>
   );
};

export default App;
