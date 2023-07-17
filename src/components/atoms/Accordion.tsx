import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = styled(MuiAccordion)(({ theme }) => ({
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
      margin: '12px 0', // Adjust margin as per your preference
    },
  },
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    gap: '8px', // Adjust gap as per your preference
  },
  '& .MuiSvgIcon-root': {
    color: '#D16A6A',
    border: '1.5px solid #D16A6A',
    borderRadius: '5px',
    padding: '3px', // Add padding to the icon
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.10)',
  borderLeft: '4px solid #D16A6A',
  background: 'rgba(170, 170, 170, 0.07)',
  padding: theme.spacing(2), // Add desired padding
}));

interface CustomAccordionProps {
  accordionLabels: string[];
  children: React.ReactNode[];
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ accordionLabels, children }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {accordionLabels.map((label, index) => (
        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleAccordionChange(`panel${index}`)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
            <Typography variant="h6">{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>{children[index]}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CustomAccordion;
