import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Grid } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import { BoxShadowIconButton, Button } from '@app/components';
import React from 'react';
import Dialog from '@app/components/atoms/Dialog';
import { useOtherRequirementContext } from '@app/providers/eligibility-criteria-other-requirement-provider';
import Requirements from './Requirements';
import SelectedRequirements from './SelectedRequirements';
import { Table } from '@app/components/atoms/Table';
import { Icon } from '@app/components/atoms/Icon';
import { OtherRequirementDocument } from '@app/@types/create-credit-product';

const OtherRequirement: React.FC<{ formik: any }> = ({ formik }) => {
   const { allRequirements } = useOtherRequirementContext();
   const { InputFieldNames, ToolTipText } = FormMeta;

   const [openRequirement, setOpenRequirement] = React.useState(false);
   const handleOpen = () => setOpenRequirement(true);
   const handleClose = () => {
      setOpenRequirement(false);
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
         {formik.values[InputFieldNames.SET_OTHER_REQUIREMENT] && (
            <>
               <Box>
                  <Button variant="text" sx={{ pl: 0, textDecoration: 'underline' }} onClick={handleOpen}>
                     Select applicable collateral assets
                  </Button>
               </Box>
               {formik.values[InputFieldNames.OTHER_REQUIREMENT_VALUES].length > 0 && (
                  <Table
                     headerProps={{
                        data: [
                           { key: 'sn', element: 'S/N' },
                           {
                              key: InputFieldNames.OTHER_REQUIREMENT_VALUES,
                              element: 'OTHER ELIGIBILITY REQUIREMENTS',
                           },
                           { key: 'cancel' },
                        ],
                     }}
                     bodyProps={{
                        rows: formik.values[InputFieldNames.OTHER_REQUIREMENT_VALUES].map(
                           (requirement: OtherRequirementDocument) => {
                              const name = allRequirements.find((e) => e.id == requirement.id)?.title;

                              return {
                                 [InputFieldNames.OTHER_REQUIREMENT_VALUES]: name,
                                 cancel: (
                                    <BoxShadowIconButton
                                       onClick={() => {
                                          const newValue = formik.values[
                                             InputFieldNames.OTHER_REQUIREMENT_VALUES
                                          ].filter((e: any) => e.id != requirement.id);
                                          formik.setFieldValue(InputFieldNames.OTHER_REQUIREMENT_VALUES, [
                                             ...newValue,
                                          ]);
                                       }}
                                    >
                                       <Icon type="close" color="primary" />
                                    </BoxShadowIconButton>
                                 ),
                              };
                           }
                        ),
                     }}
                  />
               )}
            </>
         )}
         {openRequirement && (
            <Dialog
               minWidth="75%"
               open={openRequirement}
               handleClose={handleClose}
               title="ADD OTHER ELIGIBILITY REQUIREMENTS"
            >
               <Grid container>
                  <Grid item xs={4} pr={2}>
                     <Requirements formik={formik} />
                  </Grid>
                  <Grid item xs={8}>
                     <SelectedRequirements formik={formik} onCompleted={handleClose} />
                  </Grid>
               </Grid>
            </Dialog>
         )}
      </>
   );
};

export default OtherRequirement;
