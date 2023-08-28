import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Paper, Popper, Tabs, Typography } from '@mui/material';
import { FormControlBase } from './FormControl';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Tab } from '../atoms/Tab';
import { TabPanel } from '../atoms/TabPanel';
import { useFormikContext } from 'formik';
import { useId } from '@app/hooks/useId';

interface AutoCompleteWithTabsControlProps {
   tabLabels: string[];
   name: string;
   tabPanels: ReactNode[];
   bottomButton?: ReactNode;
   maxHeight?: string | number;
}
const AutoCompleteWithTabsControl: React.FC<AutoCompleteWithTabsControlProps> = (props) => {
   const [value, setValue] = useState(0);
   const id = useId();
   const [isPopperOpen, setIsPopperOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const anchorRef = useRef<HTMLDivElement>(null);
   const { getFieldProps, setFieldValue } = useFormikContext();
   const selected = getFieldProps(props.name).value;
   const handleInputFocus = () => {
      setIsPopperOpen(true);
   };

   const handleClose = useCallback(
      (event: MouseEvent) => {
         const target = event.target as HTMLElement;
         if (!['anchor', 'popover'].some((suffix) => target.closest(`#${id}-${suffix}`))) {
            setIsPopperOpen(false);
         }
      },
      [id, setIsPopperOpen]
   );

   const handleInputBlur = () => {
      setIsPopperOpen(false);
   };
   const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(event.target.value);
      setIsPopperOpen(true);
   };

   useEffect(() => {
      document.addEventListener('click', handleClose);

      return () => document.removeEventListener('click', handleClose);
   }, [handleClose]);

   return (
      <>
         <Box ref={anchorRef} id={`${id}-anchor`}>
            <FormControlBase
               control="input"
               name={props.name}
               showErrorMessage={false}
               placeholder="Type to search and select"
               InputProps={{
                  startAdornment: (
                     <>
                        <Box display="flex" flexWrap="wrap">
                           {selected?.map((item: string) => (
                              <Typography component="span">{item}, </Typography>
                           ))}
                        </Box>
                        <br />
                        <SearchIcon />
                     </>
                  ),
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
            id={`${id}-popover`}
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
