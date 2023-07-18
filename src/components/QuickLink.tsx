import { Colors } from '@app/constants';
import { Close, LaunchOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const QuickLinkBox = styled(Box)({
   padding: '15px 10px',
   borderRadius: '10px',
   width: '100%',
   background: 'white',
});

const ContentBox = styled(Box)({
   overflowY: 'scroll',
});

const TitleBox = styled(Box)({
   borderBottom: '1px solid #DDD',
   paddingBottom: 6,
   marginBottom: 10,
});

const ActivityMessageBox = styled(Box)(() => ({
   background: '#F9F2F2',
   borderRadius: 6,
   border: `1px solid ${Colors.BgCardGray}`,
   padding: 15,
   marginBottom: 10,
}));

export const QuickLink = () => {
   return (
      <QuickLinkBox>
         <TitleBox>
            <Typography fontSize={(theme) => theme.typography.pxToRem(24)}>Quick Link</Typography>
         </TitleBox>
         <ContentBox>
            <ActivityMessageBox>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Typography variant="body2" fontWeight={600} color={Colors.DarKGray1} flexGrow={1}>
                     Suggested from your activity
                  </Typography>
                  <IconButton>
                     <Close />
                  </IconButton>
               </Box>
               <Box>
                  <Typography variant="body2">
                     As you use the application, suggested items will automatically show up here.
                  </Typography>
               </Box>
            </ActivityMessageBox>
            <Box>
               <Grid spacing={3} width="100%" marginLeft={0} container>
                  {Array.from(new Array(6)).map((_, index) => (
                     <Grid item xs={6} key={index}>
                        <Link to={'#'} style={{ textDecoration: 'none' }}>
                           <IconButton sx={{ background: Colors.LightPrimary }}>
                              <LaunchOutlined color="primary" />
                           </IconButton>
                           <Typography
                              sx={(theme) => ({ color: theme.palette.text.primary })}
                           >
                              Link {index}
                           </Typography>
                        </Link>
                     </Grid>
                  ))}
               </Grid>
            </Box>
         </ContentBox>
      </QuickLinkBox>
   );
};
