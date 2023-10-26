import { Box } from '@mui/material';

interface ListboxProps {
   addButton?: React.ReactNode;
   applyButton?: React.ReactNode;
   componentProps: React.HTMLAttributes<HTMLElement>;
}

export const Listbox = ({ addButton, applyButton, componentProps }: ListboxProps) => {
   return (
      <>
         {addButton && (
            <Box pt={1.5} display="flex" justifyContent="flex-end">
               {addButton}
            </Box>
         )}
         <ul {...componentProps} />
         {applyButton && (
            <Box py={1} display="flex" justifyContent="flex-end">
               {applyButton}
            </Box>
         )}
      </>
   );
};
