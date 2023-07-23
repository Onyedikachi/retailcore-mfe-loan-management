import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Grid } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import { Button } from '@app/components';
import React from 'react';
import Dialog from '@app/components/atoms/Dialog';
import { useOtherRequirementContext } from '@app/providers/eligibility-criteria-other-requirement-provider';
import Requirements from './Requirements';
import SelectedRequirements from './SelectedRequirements';

const OtherRequirement: React.FC<{ formik: any }> = ({ formik }) => {
   const { InputFieldNames, ToolTipText } = FormMeta;

   const [openRequirement, setOpenRequirement] = React.useState(false);
   const handleOpen = () => setOpenRequirement(true);
   const handleClose = () => setOpenRequirement(false);
   
   const { configuredRequirements } = useOtherRequirementContext();
   console.log(configuredRequirements);
   return (
      <>
         <FormControlWrapper
            sx={{ mb: 2 }}
            name={InputFieldNames.SET_OTHER_REQUIREMENT}
            label="Are there other eligibility requirements?"
            layout="horizontal"
            tooltipText={ToolTipText.otherSecurity}
         >
            <FormControlBase sx={{ ml: 7 }} name={InputFieldNames.SET_OTHER_REQUIREMENT} control="switch" />
         </FormControlWrapper>
         {formik.values.setOtherRequirement && (
            <>
               <Box>
                  <Button variant="text" sx={{ pl: 0, textDecoration: 'underline' }} onClick={handleOpen}>
                     Select applicable collateral assets
                  </Button>
               </Box>
            </>
         )}
         <Dialog
            minWidth="75%"
            open={openRequirement}
            handleClose={handleClose}
            title="ADD OTHER ELIGIBILITY REQUIREMENTS"
         >
            <Grid container>
               <Grid item xs={4} pr={2}>
                  <Requirements />
               </Grid>
               <Grid item xs={8}>
                  <SelectedRequirements onCompleted={handleClose} />
               </Grid>
            </Grid>
         </Dialog>
      </>
   );
};

export default OtherRequirement;
