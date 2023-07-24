import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
   Accordion as MuiAccordion,
   AccordionSummary as MuiAccordionSummary,
   AccordionDetails as MuiAccordionDetails,
   Typography,
   AccordionProps as MuiAccordionProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Colors } from '@app/constants';

const CustomAccordion = styled(MuiAccordion)(() => ({
   background: 'white',
   boxShadow: 'unset',
   '&.Mui-expanded': {
      margin: 0,
      '& .MuiAccordionSummary-content': {
         margin: 0,
      },
   },
   '&::before': {
      height: 0,
   },
}));

const AccordionSummary = styled(MuiAccordionSummary)(() => ({
   fontSize: '18px',
   fontWeight: 500,
   lineHeight: '32px',
   borderRadius: '10px',
   paddingLeft: 32,
   paddingRight: 40,
   boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.25)',
   zIndex: 1,
   background: 'white',
   '& .MuiSvgIcon-root': {
      border: `1.5px solid ${Colors.Primary}`,
      borderRadius: '5px',
      padding: '3px',
   },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   borderLeft: `4px solid ${Colors.Primary}`,
   padding: theme.spacing(3, 2),
   marginTop: '-7px',
}));

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
               onChange={handleChange(index)}
               expanded={expanded === index}
               key={label}
               {...otherProps}
            >
               <AccordionSummary
                  key={index}
                  expandIcon={<ExpandMoreIcon color="primary" />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
               >
                  <Typography variant="h6" fontSize="19px">
                     {label}
                  </Typography>
               </AccordionSummary>
               <AccordionDetails>{children[index]}</AccordionDetails>
            </CustomAccordion>
         ))}
      </>
   );
};

export default Accordion;
