import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { SxProps, Theme, styled } from '@mui/material';
interface StatusIndicatorProps {
   sx?: SxProps<Theme>;
}
export const StatusIndicator: React.FC<StatusIndicatorProps> = (props) => {
   return (
      <FiberManualRecordIcon
         sx={{
            color: 'primary.main',
            width: '8px',
            height: '10px',
            ml: 0.2,
            ...props.sx,
         }}
      />
   );
};
export const BigStatusIndicator = styled(FiberManualRecordIcon)(() => ({
   width: '13px',
   height: '13px',
   marginLeft: 0,
   marginRight: 1,
}));
