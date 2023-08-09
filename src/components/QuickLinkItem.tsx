import { Colors } from '@app/constants';
import { LaunchOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography, alpha, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const ContentBox = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
});

export interface QuickLinkItemProps {
   label: string;
   href: string;
}

export const QuickLinkItem = ({ label, href }: QuickLinkItemProps) => {
   return (
      <Grid item xs={6} sx={(theme) => ({ marginBottom: theme.spacing(2) })} key={label}>
         <Link to={href} style={{ textDecoration: 'none' }}>
            <ContentBox>
               <IconButton
                  color="primary"
                  sx={(theme) => ({
                     backgroundColor: `${alpha(Colors.Primary, 0.05)}`,
                     padding: theme.spacing(2),
                     marginBottom: theme.spacing(1),
                  })}
               >
                  <LaunchOutlined
                     sx={(theme) => ({
                        fontSize: theme.typography.pxToRem(38),
                     })}
                  />
               </IconButton>
               <Typography sx={(theme) => ({ color: theme.palette.text.primary })}>{label}</Typography>
            </ContentBox>
         </Link>
      </Grid>
   );
};
