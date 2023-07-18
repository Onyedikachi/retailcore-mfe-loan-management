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

const QuickLinkGrid = styled(Grid)({
   '&.quick-link-drawer': {
      position: 'absolute',
      width: 0,
      visibility: 'hidden',
      transition: 'all 0.3s',
      right: 0,
      top: 20,
      '&[aria-expanded=true]': {
         width: 'fit-content',
         visibility: 'visible',
         right: 55,
         top: 0,
         transition: 'all 0.3s',
      },
   },
});

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
   top: 40,
   transition: 'border-radius 0.3s',
   color: 'white',
   '.MuiIcon-root': {
      transform: 'rotate(0deg)',
      transition: 'transform 0.3s',
   },
   '&.content-visible': {
      borderRadius: 0,
      transition: 'border-radius 0.3s',
      '.MuiIcon-root': {
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
   return (
      <StyledBox>
         <Stack spacing={0} sx={{ overflowY: 'hidden', height: '100%' }}>
            <Box>{header}</Box>
            <ContentBox>
               <Grid container position="relative">
                  <Grid xs={9} item>
                     {content}
                  </Grid>
                  <QuickLinkGrid
                     xs={3}
                     className={`${fullContent ? 'quick-link-drawer' : ''}`}
                     aria-expanded={fullContent || showQuickLink}
                     item
                  >
                     <QuickLink />
                  </QuickLinkGrid>
               </Grid>
            </ContentBox>
         </Stack>
         {fullContent && (
            <QuickLinkToggle
               onClick={() => setShowQuickLink(true)}
               className={showQuickLink ? 'content-visible' : ''}
            >
               <KeyboardArrowLeft />
            </QuickLinkToggle>
         )}
      </StyledBox>
   );
};
