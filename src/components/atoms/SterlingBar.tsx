import { Box, Stack, styled } from '@mui/material';
import { SterlingLogo } from '../icons/SterlingLogo';

const VerticalRule = styled(Box)<{ color: string }>(({ color }) => ({
   flex: 1,
   height: 10,
   backgroundColor: color,
   borderRadius: 5,
}));

export const SterlingBar = ({
   color,
   opacity,
   style,
}: {
   style?: React.CSSProperties;
   color: string;
   opacity?: number;
}) => {
   return (
      <Stack ml={-2} direction="row" style={style} alignItems="center">
         <VerticalRule color={color} />
         <SterlingLogo sx={{ ml: '-7px', fontSize: 32, ...(opacity && { filter: `opacity(${opacity})` }) }} />
      </Stack>
   );
};
