import { SearchInput } from '@app/components';
import { Table } from '@app/components/atoms/Table';
import { Grid } from '@mui/material';
export const TaxAndAccountingLedger = () => {
   return (
      <>
         <Grid container width="75%">
            <Grid item xs={4} fontWeight="bold">
               Applicable tax(es)
            </Grid>
            <Grid item xs={8}>
               <SearchInput
                  handleSearch={() => {}}
                  debounceTime={50}
                  placeholder="Type to search and select"
               />
               <Table
                  headerProps={tableHeader}
                  bodyProps={{ rows: [1, 2].map((item) => ({ tax: 'judidi', commission: '2%' })) }}
               />
            </Grid>
         </Grid>
      </>
   );
};

const tableHeader = {
   data: [
      { key: 'tax', element: 'TAX' },
      { key: 'commission', element: 'COMMISSION' },
   ],
};
