import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
   Accordion as MuiAccordion,
   AccordionSummary as MuiAccordionSummary,
   AccordionDetails as MuiAccordionDetails,
   Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomAccordion = styled(MuiAccordion)(({ theme }) => ({
   borderRadius: '10px',
   border: '1px solid #EEE',
   background: '#FAFAFA',
   boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.25)',
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
   color: '#6F6F6F',
   fontFamily: 'Inter',
   fontSize: '20px',
   fontStyle: 'normal',
   fontWeight: 500,
   lineHeight: '32px',
   '&.Mui-expanded': {
      '& .MuiAccordionSummary-content': {
         margin: '12px 0',
      },
   },
   '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      gap: '8px',
   },
   '& .MuiSvgIcon-root': {
      color: '#D16A6A',
      border: '1.5px solid #D16A6A',
      borderRadius: '5px',
      padding: '3px',
   },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.10)',
   borderLeft: '4px solid #D16A6A',
   background: 'rgba(170, 170, 170, 0.07)',
   padding: theme.spacing(2), // Add desired padding
}));

interface AccordionProps {
   accordionLabels: string[];
   children: React.ReactNode[];
}

const Accordion: React.FC<AccordionProps> = ({ accordionLabels, children }) => {
   const [expanded, setExpanded] = useState<number | false>(false);

   const handleAccordionChange = (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
   };

   return (
      <div>
         {accordionLabels.map((label, index) => (
            <CustomAccordion
               key={index}
               expanded={expanded === index}
               onChange={handleAccordionChange(index)}
            >
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
               >
                  <Typography variant="h6">{label}</Typography>
               </AccordionSummary>
               <AccordionDetails>{children[index]}</AccordionDetails>
            </CustomAccordion>
         ))}
      </div>
   );
};

export default Accordion;
