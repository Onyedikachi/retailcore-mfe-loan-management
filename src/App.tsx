import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';
import LinearGradient from './components/atoms/LinearGradient';

const App = () => {
   return (
      <ThemeProvider theme={GlobalTheme}>
         <CssBaseline />
         <LinearGradient />
         <AppRoutes />
      </ThemeProvider>
   );
};

export default App;
