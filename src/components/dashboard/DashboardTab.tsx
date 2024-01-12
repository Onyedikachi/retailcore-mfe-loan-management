import MUITab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ArrowRight } from '@mui/icons-material';
import { Box, Divider, SelectChangeEvent, Stack, styled } from '@mui/material';
import { Colors } from '@app/constants';
import { Fragment, useEffect, useState } from 'react';
import { StatusCard } from './DashboardStatusCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusCardProps } from '@app/@types/dashboard';
import { UncontrolledSelect } from '../atoms/select';
import { usePermission } from '@app/hooks/usePermission';

const FilterWrapper = styled(Stack)(() => ({
   backgroundColor: 'white',
   color: 'GrayText',
   borderRadius: '8px',
   border: `1px solid ${Colors.BorderGray1}`,
   minHeight: 112,
   justifyContent: 'space-between',
   overflowX: 'auto',
}));

const TabStack = styled(Tabs)(() => ({
   borderRadius: '8px 0 0 8px',
   backgroundColor: Colors.LightGray6,
   gap: '2px',
   borderRight: `2px solid ${Colors.LightGray6}`,
})) as typeof Tabs;

const StyledTab = styled(MUITab)(() => ({
   width: '170px',
   padding: '10px',
   gap: '5px',
   cursor: 'pointer',
   alignItems: 'center',
   textTransform: 'none',
   minHeight: 55,
   '&.MuiTab-root.Mui-selected': {
      backgroundColor: 'white',
      color: Colors.TextGray,
   },
})) as typeof MUITab;

interface FiltersProps {
   statusOptions: Array<Omit<StatusCardProps, 'isActive' | 'onClick'>>;
   onStatusClick: (statusKey: string) => void;
   tabOptions: Array<{
      label: string;
      key: number | string;
      permissions?: string[];
   }>;
   onTabClick: (tabKey: number | string) => void;
   defaultTabKey?: number | string;
   tabKey: number | string;
   filterOptions?: Array<string>;
   filterPlaceholder?: string;
   onFilterOptionSelected: (event: SelectChangeEvent<any>) => void;
}

export const Filters = (props: FiltersProps) => {
   const [activeStatus, setActiveStatus] = useState('All');
   const [searchParams] = useSearchParams();
   const [defaultInitiator, setDefaultInitiator] = useState<string>();
   const navigate = useNavigate();
   const { accessAllRecords } = usePermission();
   const defaultKey = accessAllRecords ? props.tabOptions[0]?.key : props.tabOptions[1]?.key;

   const defaultActiveTab = searchParams.get('tab') ?? props.defaultTabKey ?? defaultKey;

   const [activeTab, setActiveTab] = useState(defaultActiveTab);

   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
      navigate(`?tab=${newValue}`);
   };

   useEffect(() => {
      navigate(`?tab=${defaultActiveTab}`);
      setDefaultInitiator(props?.filterOptions?.[0]);
   }, [defaultActiveTab]);

   const handleStatusCardClick = (key: string) => {
      if (key === 'Pending'){
         setActiveStatus('In-Review');
         props?.onStatusClick('In-Review');
      }else if (key === 'Rejected') {
         setActiveStatus('In-Issue');
         props?.onStatusClick('In-Issue');
      }
      else{
         setActiveStatus(key);
         props?.onStatusClick(key);
      }     
   };
   return (
      <FilterWrapper direction="row">
         <Stack direction="row" gap={3} flex={1}>
            <TabStack
               value={activeTab}
               onChange={handleTabChange}
               orientation="vertical"
               visibleScrollbar={false}
               aria-label="filter tabs"
               TabIndicatorProps={{ style: { display: 'none' } }}
            >
               {props.tabOptions.map((tab) => {
                  const isActive = tab.key === activeTab;
                  return (
                     <StyledTab
                        onClick={() => props.onTabClick(tab.key)}
                        value={tab.key}
                        icon={isActive ? <ArrowRight fontSize="large" color="primary" /> : <></>}
                        iconPosition="start"
                        key={tab.key}
                        label={tab.label}
                        data-testid="tab-card"
                        sx={{
                           fontSize: isActive ? '20px' : '18px',
                           fontWeight: isActive ? 600 : 400,
                           justifyContent: isActive ? 'start' : 'center',
                        }}
                     />
                  );
               })}
            </TabStack>
            <Stack direction="row" gap="10px" alignItems="center">
               {props.statusOptions?.map((data, index) => (
                  <Fragment key={`${data?.key}${index * 2}`}>
                     <StatusCard
                        data-testid="status-card"
                        onClick={() => handleStatusCardClick(data.key ?? data.label)}
                        isActive={(data?.key ?? data.label) === activeStatus}
                        {...data}
                     />
                     {index !== props.statusOptions?.length - 1 && (
                        <Divider
                           orientation="vertical"
                           variant="middle"
                           flexItem
                           sx={{ height: '54px', alignSelf: 'center' }}
                        />
                     )}
                  </Fragment>
               ))}
            </Stack>
         </Stack>
         {props.filterOptions && (
            <Box mr={1} mt={2}>
               <UncontrolledSelect
                  size="small"
                  name="filter"
                  value={defaultInitiator ?? props?.filterOptions?.[0]}
                  options={props?.filterOptions}
                  onChange={(event: SelectChangeEvent<any>) => {
                     setDefaultInitiator(event.target.value);
                     props?.onFilterOptionSelected(event);
                  }}
                  sx={{
                     height: '32px',
                     borderRadius: '6px',
                     minWidth: '150px',
                  }}
               />
            </Box>
         )}
      </FilterWrapper>
   );
};
