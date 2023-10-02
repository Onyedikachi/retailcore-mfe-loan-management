import { AccordionVariant } from '@app/components/accordion/Accordion';
import { Box } from '@mui/material';
import { Colors } from '@app/constants/colors';
import { FormControlBase } from '@app/components/forms/FormControl';
import React from 'react';
import { assetsCheckbox } from './TabContentHeader';

export const TabContent: React.FC<{ name: string; options: string[] }> = ({ name, options }) => {
   return (
      <>
         <AccordionVariant accordionLabels={assetsCheckbox(name, [options, []])}>
            <Box
               ml={3}
               sx={{
                  fontSize: 12,
                  '& .MuiSvgIcon-root': { color: Colors.Primary },
                  '& .MuiCheckbox-root': { padding: '0px 4px' },
               }}
            >
               <FormControlBase control="checkboxGroup" name={name} options={options} />
            </Box>
            <></>
         </AccordionVariant>
      </>
   );
};
