import { Box, Divider, styled } from '@mui/material';
import { SearchInput } from '../atoms/SearchInput';
import { Button } from '../atoms/Button';
import { Colors } from '@app/constants/colors';
import DownloadIcon from '@mui/icons-material/Download';
import SyncIcon from '@mui/icons-material/Sync';

const StyledSearchInput = styled(SearchInput)(() => ({
   '& .MuiInputBase-root, .MuiInputBase-root:hover': {
      borderRadius: '2px',
      boxShadow: ' 0px 0px 5px -1px rgba(0, 0, 0, 0.25)',
      height: '28px',
      '& ::placeholder': { fontSize: 12 },
      fontSize: 14,
      width: '250px',
   },
   '& .MuiInputBase-root:hover:not(.Mui-disabled):before': { border: 'unset' },
   '& .MuiInput-root:before': { border: 'unset' },
   '& .MuiInput-root:fieldset': { border: 'unset' },
   '&:hover': { border: 'unset' },
   '&.Mui-focused fieldset': { border: 'unset' },
   '& .MuiInput-root:after': { border: 'unset' },
   '& .MuiSvgIcon-root': { marginLeft: '8px', width: '20px' },
}));

interface TableHeadingProps {
   handleSearch: (text: string) => void;
   handleRefresh: () => void;
   handleDownload: () => void;
   searchPlaceholder?: string;
}

export const TableHeading: React.FC<TableHeadingProps> = (props) => {
   return (
      <Box display="flex" justifyContent="end" alignItems="center" gap={2} px={2}>
         <StyledSearchInput handleSearch={props.handleSearch} placeholder={props?.searchPlaceholder} />
         <Divider orientation="vertical" sx={{ height: '15px' }} />
         <Button
            variant="text"
            sx={{ p: 1, pb: 0.2, color: Colors.TextGray }}
            startIcon={<SyncIcon />}
            onClick={props.handleDownload}
         >
            Refresh
         </Button>
         <Divider orientation="vertical" sx={{ height: '15px' }} />
         <Button
            variant="text"
            sx={{ p: 1, pb: 0.2, color: Colors.TextGray }}
            startIcon={<DownloadIcon />}
            onClick={props.handleDownload}
         >
            Download
         </Button>
      </Box>
   );
};
