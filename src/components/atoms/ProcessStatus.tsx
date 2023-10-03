import { Colors } from '@app/constants/colors';
import { Box, Stack, Typography, styled } from '@mui/material';
import { SterlingLogo } from '../icons/SterlingLogo';
import { PaddedBox } from './PaddedBox';

interface ProcessStatusProp {
   percentage: number;
   currentLabel: string;
   endLabel: string;
   title?: string;
}
export const ProcessStatus: React.FC<ProcessStatusProp> = (props) => {
   return (
      <PaddedBox >
         <Typography mb={3}>{props.title ?? 'Processing status:'}</Typography>
         <Box display="flex" alignItems="center" width="100%" pl={5}>
            <Bar style={{ zIndex: 1, width: `${props.percentage}%` }} color={Colors.Primary} />
            <Bar
               style={{ marginLeft: -5, width: `${100 - props.percentage}%` }}
               opacity={0.6}
               color={Colors.LightGray1}
            />
         </Box>
         <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2">{props.currentLabel}</Typography>
            <Typography variant="body2">{props.endLabel}</Typography>
         </Box>
      </PaddedBox>
   );
};

const VerticalRule = styled(Box)<{ color: string }>(({ color }) => ({
   flex: 1,
   height: 10,
   backgroundColor: color,
   borderRadius: 5,
}));

const Bar = ({ color, opacity, style }: { style?: React.CSSProperties; color: string; opacity?: number }) => {
   return (
      <Stack ml={-2} direction="row" style={style} alignItems="center">
         <VerticalRule color={color} />
         <SterlingLogo
            sx={{ ml: '-7px', fontSize: 32, ...(opacity && { filter: `opacity(${opacity})` }) }}
         />
      </Stack>
   );
};
