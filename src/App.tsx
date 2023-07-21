import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';
import LinearGradient from './components/atoms/LinearGradient';
import { StepperProvider } from './providers';

const App = () => {
   return (
      <ThemeProvider theme={GlobalTheme}>
         <CssBaseline />
         <StepperProvider>
            <AppRoutes />
         </StepperProvider>
         <CssBaseline />
         <LinearGradient />
      </ThemeProvider>
   );
};
export default App;
