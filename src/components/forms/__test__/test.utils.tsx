import { ObjectAny } from '@app/@types';
import { Box } from '@mui/system';
import { Formik, Form } from 'formik';

export const TestForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <Box>
         <Formik initialValues={{ input: '' }} onSubmit={(values: ObjectAny) => {}}>
            {() => {
               return <Form>{children}</Form>;
            }}
         </Formik>
      </Box>
   );
};
