import { Button } from '@app/components/atoms/Button';
import { Colors } from '@app/constants';
import { Box, Divider, List, Typography } from '@mui/material';
import React from 'react';
import Accordion from '@app/components/accordion/Accordion';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import ConfigureRequirementForm from './ConfigureRequirement';
import { FieldArray, FormikProps } from 'formik';
import { useOtherRequirementContext } from '@app/providers/eligibility-criteria-other-requirement-provider';

interface SelectedRequirementsProps {
   onCompleted: () => void;
   formik: FormikProps<any>;
}
const SelectedRequirements: React.FC<SelectedRequirementsProps> = ({ onCompleted, formik }) => {
   const { selectedRequirements, handleClearSelectedRequirement } = useOtherRequirementContext();
   const { InputFieldNames } = FormMeta;

   return (
      <>
         <Box textAlign="end">
            <Button
               variant="text"
               sx={{ px: 0, textDecoration: 'underline' }}
               onClick={handleClearSelectedRequirement}
            >
               Clear selection
            </Button>
         </Box>
         <Box sx={{ border: `1px solid ${Colors.LightGray}`, borderRadius: '5px', minHeight: '90%' }}>
            <Typography sx={{ p: 2 }}>Requirements</Typography>
            <Box>
               <Divider />
            </Box>
            <Box sx={{ maxHeight: '400px', overflow: 'auto', px: 2 }}>
               <List className="fancy-scrollbar">
                  <FieldArray
                     render={() => (
                        <Accordion accordionLabels={selectedRequirements.map((e) => e.title)}>
                           {selectedRequirements.map((item, index) => (
                              <ConfigureRequirementForm
                                 name={`${InputFieldNames.OTHER_REQUIREMENT_VALUES}[${index}].`}
                                 key={index}
                                 formik={formik}
                                 requirement={item}
                              />
                           ))}
                        </Accordion>
                     )}
                     name={InputFieldNames.OTHER_REQUIREMENT_VALUES}
                  />
               </List>
               {selectedRequirements.length > 0 && (
                  <Box textAlign="center" mt={5} mb={2}>
                     <Button
                        color="primary"
                        onClick={() => onCompleted()}
                        disabled={Boolean(formik.errors[InputFieldNames.OTHER_REQUIREMENT_VALUES])}
                     >
                        Save & Apply
                     </Button>
                  </Box>
               )}
            </Box>
         </Box>
      </>
   );
};

export default SelectedRequirements;
