import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Typography } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import InfoTooltip from '@app/components/atoms/Tooltip';
import { Button } from '@app/components';

const Security: React.FC<{ formik: any }> = ({ formik }) => {
   const { InputFieldNames, ToolTipText } = FormMeta;
   return (
      <>
         <FormControlWrapper
            sx={{ mb: 2 }}
            name={InputFieldNames.SET_SECURITY}
            label="Does this product requires securities?"
            layout="horizontal"
            tooltipText={ToolTipText.security}
         >
            <FormControlBase sx={{ ml: 7 }} name={InputFieldNames.SET_SECURITY} control="switch" />
         </FormControlWrapper>
         {formik.values.setSecurity && (
            <>
               <Box>
                  <Typography>
                     Security Options
                     <InfoTooltip text={ToolTipText.security} />
                  </Typography>
                  <Box pl={1} py={2}>
                     <FormControlBase
                        control="checkboxGroup"
                        name={InputFieldNames.SECURITY_OPTION}
                        placeholder="Select period"
                        options={FormMeta.securityOptions}
                        actionComp={[
                           <Box mb={1}>
                              <Button variant="text" sx={{ pl: '22px', textDecoration: 'underline' }}>
                                 Select applicable supporting documents
                              </Button>
                           </Box>,
                           <Box mb={1}>
                              <Button variant="text" sx={{ pl: '22px', textDecoration: 'underline' }}>
                                 Select applicable collateral assets
                              </Button>
                           </Box>,
                           <Box mb={1}>
                              <Button variant="text" sx={{ pl: '22px', textDecoration: 'underline' }}>
                                 Select applicable security requirements
                              </Button>
                           </Box>,
                        ]}
                     />
                  </Box>
               </Box>
            </>
         )}
      </>
   );
};

export default Security;
