import React, { ReactNode, useState } from 'react';
import { Popper, Paper, TextField, FormControl, Box, Tabs, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Tab } from '../atoms/Tab';
import { TabPanel } from '../atoms/TabPanel';
import { FormControlBase } from './FormControl';
import { useFormikContext } from 'formik';
import { useFormikHelper } from '@app/hooks/useFormikHelper';

interface AutoCompleteWithTabsControlProps {
   tabLabels: string[];
   name: string;
   tabPanels: ReactNode[];
   bottomButton?: ReactNode;
   maxHeight?: string | number;
}
const AutoCompleteWithTabsControl: React.FC<AutoCompleteWithTabsControlProps> = (props) => {
   const [value, setValue] = React.useState(0);
   const [isPopperOpen, setIsPopperOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const anchorRef = React.useRef<HTMLDivElement>(null);
   const { getFieldProps, setFieldValue } = useFormikContext();
   let selected = getFieldProps(props.name).value;
   const handleInputFocus = () => {
      setIsPopperOpen(true);
   };

   const handleInputBlur = () => {
      setIsPopperOpen(false);
   };
   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(event.target.value);
      setIsPopperOpen(true);
   };

   return (
      <>
         <Box ref={anchorRef}>
            <FormControlBase
               control="input"
               name={props.name}
               showErrorMessage={false}
               placeholder="Type to search and select"
               InputProps={{
                  startAdornment: <SearchIcon />,
                  ...(selected.length > 0 && {
                     endAdornment: (
                        <IconButton onClick={() => setFieldValue(props.name, [])}>
                           <CloseIcon />
                        </IconButton>
                     ),
                  }),
               }}
               onChange={handleInputChange}
               onFocus={handleInputFocus}
               onBlur={handleInputBlur}
            />
         </Box>
         <Popper
            open={isPopperOpen}
            //open={true}
            anchorEl={anchorRef.current}
            placement="bottom-start"
            style={{ width: anchorRef.current?.clientWidth, zIndex: 10 }}
         >
            <Paper
               className="fancy-scrollbar"
               sx={{ p: 1, maxHeight: props.maxHeight ?? '250px', overflow: 'auto' }}
            >
               <Tabs
                  value={value}
                  onChange={handleTabChange}
                  TabIndicatorProps={{ style: { display: 'none' } }}
                  variant="scrollable"
                  orientation="horizontal"
               >
                  {props.tabLabels.map((label, index) => (
                     <Tab label={label} value={index} key={label} disabled={index != 0} />
                  ))}
               </Tabs>
               {props.tabPanels.map((panel, index) => (
                  <TabPanel value={value} key={'panel' + index} index={index}>
                     {panel}
                  </TabPanel>
               ))}
               <Box textAlign="end"> {props.bottomButton}</Box>
            </Paper>
         </Popper>
      </>
   );
};

export default AutoCompleteWithTabsControl;
