import { Tooltip, styled } from '@mui/material';

const StyledEllipsis = styled('span')({
   overflow: 'hidden',
   whiteSpace: 'nowrap',
   textOverflow: 'ellipsis',
   display: 'block',
});

export const Ellipsis: React.FC<{ text: string }> = ({ text }) => {
   return (
      <Tooltip arrow placement="top-start" title={text}>
         <StyledEllipsis>{text}</StyledEllipsis>
      </Tooltip>
   );
};
