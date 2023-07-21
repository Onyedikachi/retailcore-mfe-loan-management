import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';
import LinearGradient from './components/atoms/LinearGradient';
import { APIRequestProvider } from './providers/api-request';

const App = () => {
   return (
      <ThemeProvider theme={GlobalTheme}>
         <APIRequestProvider>
            <CssBaseline />
            <AppRoutes />
            <CssBaseline />
            <LinearGradient />
         </APIRequestProvider>
      </ThemeProvider>
   );
};
export default App;
