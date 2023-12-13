import { Box } from '@mui/material';
import { TableHeading } from '../TableHeading';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableHeaderProps } from '@app/components/table/TableHeader';
import { useMemo, useState } from 'react';
import { Table } from '@app/components/table';
import { useAppContext } from '@app/providers/app-provider';
import { performanceHeaderData } from './table-data/performance-header-data';
import { downloadAsCSVByID } from '@app/helper/csvDownloader';
import { performanceBodyData } from './table-data/performance-body-data';

export const PerformanceTable = () => {
   const [searchParams] = useSearchParams();
   const type = searchParams.get('type');
   const [performanceType, setPerformanceType] = useState<string | null>(type);
   const { defaultCurrency } = useAppContext();
   const navigate = useNavigate();

   const performing: TableHeaderProps = useMemo(
      () =>
         performanceHeaderData(
            (initiator) => {},
            (selectedType) => {
               if (selectedType && !selectedType?.includes('All')) {
                  setPerformanceType(selectedType);
                  navigate(`?type=${selectedType}`);
               }
            },
            (startDate, endDate) => {},
            performanceType
         ),
      [performanceType]
   );

   const performingTableBody = useMemo(() => {
      return [1, 2, 3, 4, 5].map((item, id) =>
         performanceBodyData(defaultCurrency?.abbreviation ?? 'NGN', performanceType)
      );
   }, [performanceType]);

   return (
      <Box sx={{ px: 1, py: 2, borderRadius: 1, border: '1px solid #E5E9EB' }}>
         <TableHeading
            handleSearch={(text) => {}}
            handleRefresh={() => {}}
            handleDownload={() => {
               downloadAsCSVByID('performance', performanceType ?? '');
            }}
            searchPlaceholder="Search by customer name/account"
         />
         <Box pt={1} pb={5}>
            <Table
               sx={{ '& .MuiTableCell-root': { p: 0.8 } }}
               id="performance"
               headerProps={performing}
               bodyProps={{ rows: performingTableBody }}
            />
         </Box>
      </Box>
   );
};
