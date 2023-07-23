import { Button } from '@app/components/atoms/Button';
import { Colors } from '@app/constants';
import { Box, Divider, List, Typography } from '@mui/material';
import React from 'react';
import Accordion from '@app/components/accordion/Accordion';

import ConfigureRequirementForm from './ConfigureRequirement';
import { FieldArray, Form, Formik } from 'formik';
import {
   fieldName,
   validator,
   initialValues,
} from '@app/utils/validators/personal-loan/configure-requirement';
import { ObjectAny } from '@app/@types';
import { useOtherRequirementContext } from '@app/providers/eligibility-criteria-other-requirement-provider';

interface SelectedRequirementsProps {
   onCompleted: () => void;
}
const SelectedRequirements: React.FC<SelectedRequirementsProps> = ({ onCompleted }) => {
   const { selectedRequirements, handleConfigureRequirement, handleClearSelectedRequirement } =
      useOtherRequirementContext();

   const onSubmit = (values: ObjectAny) => {
      const configuredRequirement = selectedRequirements.map((name, index) => ({
         name: name.title,
         ...values[fieldName][index],
      }));
      handleConfigureRequirement(configuredRequirement);
      onCompleted();
   };
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
            <Typography sx={{ p: 2 }}>
               Requirements <Divider />
            </Typography>
            <Formik
               initialValues={initialValues(selectedRequirements)}
               validationSchema={validator}
               onSubmit={onSubmit}
            >
               {(formik) => {
                  return (
                     <Form>
                        <Box sx={{ maxHeight: '400px', overflow: 'auto', px: 2 }}>
                           <List className="fancy-scrollbar">
                              <FieldArray
                                 render={() => (
                                    <Accordion accordionLabels={selectedRequirements.map((e) => e.title)}>
                                       {selectedRequirements.map((item, index) => (
                                          <ConfigureRequirementForm
                                             name={`${fieldName}[${index}].`}
                                             key={index}
                                             formik={formik}
                                          />
                                       ))}
                                    </Accordion>
                                 )}
                                 name={fieldName}
                              />
                           </List>
                           {selectedRequirements.length > 0 && (
                              <Box textAlign="center" mt={5} mb={2}>
                                 <Button
                                    type="submit"
                                    color="primary"
                                    disabled={!formik.dirty || !formik.isValid}
                                 >
                                    Save & Apply
                                 </Button>
                              </Box>
                           )}
                        </Box>
                     </Form>
                  );
               }}
            </Formik>
         </Box>
      </>
   );
};

export default SelectedRequirements;
