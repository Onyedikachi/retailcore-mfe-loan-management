import { Grid, Stack, Typography, styled } from '@mui/material';
import NestedDropdown from '../NestedDropdown';
import { SearchInput } from '../atoms';
import { Colors, RoutePaths } from '@app/constants';
import { Link, useLocation } from 'react-router-dom';

const StyledLink = styled(Link, { shouldForwardProp: (prop) => prop !== 'isActive' })<{ isActive: boolean }>(
   ({ isActive }) => ({
      paddingBottom: 4,
      textDecoration: 'none',
      borderBottom: `3px solid ${Colors.LightGray1}`,
      color: Colors.TextGray,
      ...(isActive && { color: Colors.DarKGray1, borderBottomColor: Colors.Primary }),
   })
);

export const DashboardHeader = () => {
   const location = useLocation();

   const handleSearch = () => {
      // TODO: Search will be handled by a provider,
   };

   return (
      <Stack paddingX={3} paddingTop={2}>
         <NestedDropdown />
         <Grid container marginTop={4} justifyContent="space-between">
            <Grid item xs display="flex" gap={3}>
               {[
                  RoutePaths.DashboardOverview,
                  RoutePaths.DashboardPersonal,
                  RoutePaths.DashboardSME,
                  RoutePaths.DashboardCorporate,
               ].map(({ name, absolute }) => (
                  <StyledLink key={name} isActive={location.pathname === absolute} to={absolute}>
                     <Typography variant={location.pathname === absolute ? 'h5' : 'body1'}>{name}</Typography>
                  </StyledLink>
               ))}
            </Grid>
            <Grid item xs="auto">
               <SearchInput handleSearch={handleSearch} />
            </Grid>
         </Grid>
      </Stack>
   );
};
