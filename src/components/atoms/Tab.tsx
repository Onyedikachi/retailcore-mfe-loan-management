import { Colors } from '@app/constants/colors';
import { styled, Tab as MuiTab } from '@mui/material';

export const Tab = styled(MuiTab)({
   textTransform: 'capitalize',
   margin: '0 10px',
   padding: '0',
   minHeight: '35px',
   minWidth: '65px',
   position: 'relative',
   '&:before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: `#DDE2E4`,
      borderRadius: '10px',
   },
   '&.Mui-selected:before': {
      background: `${Colors.Primary}`,
   },
   '&.Mui-selected': { color: 'inherit' },
});
