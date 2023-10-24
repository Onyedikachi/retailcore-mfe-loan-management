import { Colors } from '@app/constants';
import { Close } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography, styled } from '@mui/material';
import { QuickLinkItem } from './QuickLinkItem';

const QuickLinkBox = styled(Box)({
   padding: '15px 10px',
   borderRadius: '10px',
   width: '100%',
   maxWidth: '250px',
   background: 'white',
   height: 'max-content',
   maxHeight: '100%',
   overflowY: 'scroll',
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

const ActivityMessageHeader = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: 1,
   marginBottom: 2,
});

export const QuickLink = () => {
   return (
      <QuickLinkBox>
         <TitleBox>
            <Typography fontSize={(theme) => theme.typography.pxToRem(24)}>Quick Link</Typography>
         </TitleBox>
         <ContentBox>
            <ActivityMessageBox>
               <ActivityMessageHeader>
                  <Typography variant="body2" fontWeight={600} color={Colors.DarKGray1} flexGrow={1}>
                     Suggested from your activity
                  </Typography>
                  <IconButton>
                     <Close fontSize="small" />
                  </IconButton>
               </ActivityMessageHeader>
               <Box>
                  <Typography variant="body2">
                     As you use the application, suggested items will automatically show up here.
                  </Typography>
               </Box>
            </ActivityMessageBox>
            <Box>
               <Grid spacing={0} width="100%" marginLeft={0} container>
                  {Array.from(new Array(6)).map((_, index) => (
                     <QuickLinkItem key={index * 2} label={`Link ${index}`} href={'#'} />
                  ))}
               </Grid>
            </Box>
         </ContentBox>
      </QuickLinkBox>
   );
};
