import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import { Button } from '@app/components';
import React from 'react';
import Dialog from '@app/components/atoms/Dialog';
import AddOtherRequirements from './AddOtherRequirement';

const OtherRequirement: React.FC<{ formik: any }> = ({ formik }) => {
   const { InputFieldNames, ToolTipText } = FormMeta;
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

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
         <Dialog open={true} handleClose={handleClose} title="ADD OTHER ELIGIBILITY REQUIREMENTS">
            <AddOtherRequirements requirements={[]} />
         </Dialog>
      </>
   );
};

export default OtherRequirement;
