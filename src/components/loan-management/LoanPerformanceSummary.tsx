import { Box, Divider, Tabs, Typography } from '@mui/material';
import { PaddedContainer } from '../containers/PaddedContainer';
import { Button } from '../atoms/Button';
import InfoIcon from '@mui/icons-material/Info';
import { Tab } from '../atoms/Tab';
import { TabPanel } from '../atoms/TabPanel';
import { ReactNode, useState } from 'react';

interface LoanPerformanceSummaryProps {
   tabLabels: string[];
   title: string;
   tabPanels: ReactNode[];
   onClickViewMore?: () => void;
}
export const LoanPerformanceSummary: React.FC<LoanPerformanceSummaryProps> = (props) => {
   const [value, setValue] = useState(0);
   return (
      <PaddedContainer sx={{ bgcolor: 'white', p: 1.5 }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <Typography fontWeight="bold">{props.title}</Typography>{' '}
            <Button
               variant="text"
               sx={{ p: 1, pb: 0.2, textDecoration: 'underline' }}
               startIcon={<InfoIcon sx={{ color: '#BDBDBD' }} />}
               onClick={props.onClickViewMore}
            >
               View More
            </Button>
         </Box>
         <Divider />
         <Box pt={1}>
            <Tabs
               value={value}
               onChange={(_: React.SyntheticEvent, newValue: number) => {
                  setValue(newValue);
               }}
               TabIndicatorProps={{ style: { display: 'none' } }}
               variant="scrollable"
               orientation="horizontal"
            >
               {props.tabLabels.map((label, index) => (
                  <Tab label={label} value={index} key={label} disabled={index > 1} />
               ))}
            </Tabs>
            {props.tabPanels.map((panel, index) => (
               <TabPanel value={value} key={'panel' + index} index={index}>
                  <Box className="fancy-scrollbar" sx={{ height: '300px', overflow: 'auto' }}>
                     {panel}
                  </Box>
               </TabPanel>
            ))}
         </Box>
      </PaddedContainer>
   );
};
