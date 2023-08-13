import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
   Accordion as MuiAccordion,
   AccordionSummary as MuiAccordionSummary,
   AccordionDetails as MuiAccordionDetails,
   Typography,
   AccordionProps as MuiAccordionProps,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CustomAccordion = styled(MuiAccordion)(() => ({
   fontFamily: 'Inter',
   background: 'white',
   boxShadow: 'unset',
   '&.Mui-expanded': { margin: 0, '& .MuiAccordionSummary-content': { margin: 0 } },
   '&::before': {
      height: 0,
   },
}));

const AccordionSummary = styled(MuiAccordionSummary)(() => ({
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: 500,
   lineHeight: '32px',
   borderRadius: '5px',
   height: '40px',
   minHeight: '42px',
   padding: '5px',
   boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.1)',
   zIndex: 1,
   margin: '10px 0px',
   background: 'white',
   flexDirection: 'row-reverse',
   '& .MuiSvgIcon-root': {
      padding: '3px',
   },
   '& .MuiAccordionSummary-expandIconWrapper': {
      transition: 'transform 0.3s',
      transform: 'rotate(0deg)',
   },
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transition: 'transform 0.3s',
      transform: 'rotate(90deg)',
   },
   '&.Mui-expanded': { minHeight: '42px' },
   '& .MuiAccordionSummary-content': {},
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({}));

interface AccordionProps extends MuiAccordionProps {
   accordionLabels: string[];
   children: React.ReactNode[];
}

const Accordion: React.FC<AccordionProps> = ({ accordionLabels, children, ...otherProps }) => {
   const [expanded, setExpanded] = useState<number | false>(false);

   const handleChange = (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
   };

   return (
      <>
         {accordionLabels.map((label, index) => (
            <CustomAccordion
               key={label + index}
               onChange={handleChange(index)}
               expanded={expanded === index}
               {...otherProps}
            >
               <AccordionSummary
                  expandIcon={<ArrowRightIcon color="primary" />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
               >
                  <Typography fontSize="18px">{label}</Typography>
               </AccordionSummary>
               <AccordionDetails sx={{ px: 3 }}>{children[index]}</AccordionDetails>
            </CustomAccordion>
         ))}
      </>
   );
};

export default Accordion;
export const AccordionVariant = styled(Accordion)(() => ({
   '& .MuiButtonBase-root': { boxShadow: 'none', margin: '0px' },
   '& .MuiSvgIcon-root': { color: 'black' },
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transition: 'transform 0.3s',
      transform: 'rotate(45deg)',
   },
   '& .MuiAccordionDetails-root': { paddingBottom: '3px', paddingTop: '3px' },
}));
