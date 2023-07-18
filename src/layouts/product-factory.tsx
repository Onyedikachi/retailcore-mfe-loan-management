import { QuickLink } from '@app/components/QuickLink';
import { Colors } from '@app/constants';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { Box, Grid, Stack } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const StyledBox = styled(Box)({
   height: 'calc(100vh - 60px)',
   marginTop: 10,
   position: 'relative',
});

const QuickLinkExpandBox = styled(Box)(() => ({
   position: 'absolute',
   height: 0,
   opacity: 0,
   transition: 'all 0.3s',
   right: -50,
   top: 200,
   '&[aria-expanded=true]': {
      width: 'fit-content',
      right: 55,
      opacity: 1,
      height: 'fit-content',
      top: 70,
      transition: 'all 0.3s'
   },
   '& > div': {
      boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.25)',
      border: `1px solid ${Colors.LightGray1}`,
   }
}));

const QuickLinkToggle = styled('div')(() => ({
   width: 48,
   height: 142,
   position: 'absolute',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: '20px 0 0 20px',
   background: Colors.LinearGradient,
   boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.25)',
   right: 0,
   top: 70,
   transition: 'border-radius 0.3s',
   color: 'white',
   '.MuiSvgIcon-root': {
      transform: 'rotate(0deg)',
      transition: 'transform 0.3s',
   },
   '&.content-visible': {
      borderRadius: 0,
      transition: 'border-radius 0.3s',
      '.MuiSvgIcon-root': {
         transform: 'rotate(180deg)',
         transition: 'transform 0.3s',
      },
   },
}));

const ContentBox = styled(Box)(() => ({
   padding: 10,
   background: Colors.Gray50,
}));

export interface ProductFactoryLayoutProps {
   header: React.ReactNode;
   content: React.ReactNode;
   fullContent: boolean;
}

export const ProductFactoryLayout = ({ header, content, fullContent = false }: ProductFactoryLayoutProps) => {
   const [showQuickLink, setShowQuickLink] = React.useState(false);
   const stackHeaderRef = React.useRef<HTMLElement>(null);
   const [headerHeight, setHeaderHeight] = React.useState<number>();

   React.useEffect(() => {
      setHeaderHeight(stackHeaderRef.current?.clientHeight);
   }, [stackHeaderRef.current]);

   return (
      <StyledBox>
         <Stack spacing={0} sx={{ overflowY: 'hidden', height: '100%' }}>
            <Box ref={stackHeaderRef}>{header}</Box>
            <ContentBox height={headerHeight && `calc(100% - ${headerHeight}px)`}>
               <Grid container height="100%" position="relative">
                  <Grid item>{content}</Grid>
                  {!fullContent && (
                     <Grid xs={3} height="100%" item>
                        <QuickLink />
                     </Grid>
                  )}
               </Grid>
            </ContentBox>
         </Stack>
         {fullContent && (
            <>
               <QuickLinkToggle
                  onClick={() => setShowQuickLink(!showQuickLink)}
                  className={showQuickLink ? 'content-visible' : ''}
               >
                  <KeyboardArrowLeft />
               </QuickLinkToggle>
               <QuickLinkExpandBox aria-expanded={!fullContent || showQuickLink}>
                  <QuickLink />
               </QuickLinkExpandBox>
            </>
         )}
      </StyledBox>
   );
};
