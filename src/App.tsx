import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';
import { APIRequestProvider } from './providers/api-request';
import { CreateProductProvider } from './providers/create-product';

const App = () => {
   return (
      <ThemeProvider theme={GlobalTheme}>
         <APIRequestProvider>
            <CssBaseline />
            <CreateProductProvider>
               <AppRoutes />
            </CreateProductProvider>
            <CssBaseline />
         </APIRequestProvider>
      </ThemeProvider>
   );
};
export default App;
