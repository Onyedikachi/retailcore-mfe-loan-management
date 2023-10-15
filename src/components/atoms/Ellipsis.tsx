import { Box, Tooltip, styled } from '@mui/material';

const StyledEllipsis = styled(Box)({ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' });

export const Ellipsis: React.FC<{ text: string }> = ({ text }) => {
   return (
      <Tooltip arrow placement="top-start" title={text}>
         <StyledEllipsis>{text}</StyledEllipsis>
      </Tooltip>
   );
};
