import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';
import LinearGradient from './components/atoms/LinearGradient';
import { APIRequestProvider } from './providers/api-request';
import { StepperProvider } from './providers';

const App = () => {
   return (
      <ThemeProvider theme={GlobalTheme}>
         <APIRequestProvider>
            <CssBaseline />
            <StepperProvider>
               <AppRoutes />
            </StepperProvider>
            <CssBaseline />
            <LinearGradient />
         </APIRequestProvider>
      </ThemeProvider>
   );
};
export default App;
