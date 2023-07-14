import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  accordion: {
    borderRadius: '10px',
    border: '1px solid #EEE',
    background: '#FAFAFA',
    boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.25)',
  },
  heading: {
    color: '#6F6F6F',
    fontFamily: 'Inter',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px',

  },
  content: {
    boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.10)',
    borderLeft: '5px solid #D16A6A',
    background: 'rgba(170, 170, 170, 0.07)',
  },
  icon: {
    color: '#D16A6A',
    border: '2px solid #D16A6A',
    borderRadius: '5px'
  },
}));

interface AccordionProps {
  text: string;
  component: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ text, component }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <MuiAccordion
      className={classes.accordion}
      expanded={expanded}
      onChange={handleAccordionChange}
    >
      <MuiAccordionSummary
     expandIcon={<ExpandMoreIcon className={classes.icon} />}
     aria-controls="accordion-content"
     id="accordion-header"
      >
        <Typography variant="h6" className={classes.heading}>
          {text}
        </Typography>
      </MuiAccordionSummary>
      <MuiAccordionDetails className={classes.content}>
        <div>{component}</div>
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;