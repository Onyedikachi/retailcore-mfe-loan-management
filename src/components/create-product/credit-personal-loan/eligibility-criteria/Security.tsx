import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Typography } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import { Button, InputErrorText, Tooltip } from '@app/components';
import { useState } from 'react';
import { SecurityOptions } from '@app/@types/create-credit-product';
import { ModalWithCheckBoxList } from '@app/components/modal/ModalWithCheckBoxList/Modal';
import { useSecurityAction } from '@app/hooks/useSecurityAction';
import { SecurityOptionsTable } from './SecurityOptionsTable';
import { EligibilitySecurity } from '@app/constants/eligibility-security';
import { ErrorMessage, FieldArray, FormikProps } from 'formik';

const Security: React.FC<{ formik: FormikProps<any> }> = ({ formik }) => {
   const [activeSecurityModal, setActiveSecurityModal] = useState<SecurityOptions | null>();
   const { InputFieldNames, ToolTipText } = FormMeta;
   const { [InputFieldNames.SET_SECURITY]: setSecurity } = formik.values;

   const { removeCheckItem, updateCheckedItems, securityDocuments, addNewSecurityValue } =
      useSecurityAction(formik);

   const getCheckedSecurity = (securityType: SecurityOptions) => {
      return securityDocuments[securityType as SecurityOptions]
         .filter(({ checked }) => checked)
         .map(({ name, id }) => ({ name, id: id, ...(securityType === 'collateral' && { mmi: 100 }) }));
   };

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
         {setSecurity && (
            <>
               <Box>
                  <Typography>
                     Security Options
                     <Tooltip text={ToolTipText.security} />
                  </Typography>
                  <Box pl={1} py={2}>
                     <FormControlBase
                        control="checkboxGroup"
                        name={InputFieldNames.SECURITY_OPTION}
                        placeholder="Select period"
                        options={FormMeta.securityOptions}
                        actionComp={['guarantor', 'collateral', 'other'].map((securityType, index) => (
                           <Box mb={1} key={index}>
                              <Button
                                 onClick={() => setActiveSecurityModal(securityType as SecurityOptions)}
                                 variant="text"
                                 sx={{ pl: '22px', textDecoration: 'underline' }}
                              >
                                 {EligibilitySecurity[securityType as SecurityOptions].actionButtonText}
                              </Button>
                              <ErrorMessage
                                 name={EligibilitySecurity[securityType as SecurityOptions].formFieldName}
                                 children={(error: string) => <InputErrorText errorText={error} />}
                              />
                              <FieldArray
                                 name={EligibilitySecurity[securityType as SecurityOptions].formFieldName}
                                 render={(arrayHelper) => (
                                    <SecurityOptionsTable
                                       type={securityType as SecurityOptions}
                                       securities={getCheckedSecurity(securityType as SecurityOptions)}
                                       onCancelClick={removeCheckItem}
                                       arrayHelper={arrayHelper}
                                       fieldName={
                                          EligibilitySecurity[securityType as SecurityOptions].formFieldName
                                       }
                                    />
                                 )}
                              />
                           </Box>
                        ))}
                     />
                  </Box>
               </Box>
               {!!activeSecurityModal && (
                  <ModalWithCheckBoxList
                     open={true}
                     onClose={() => setActiveSecurityModal(null)}
                     onSubmit={(checkedItems) => {
                        activeSecurityModal && updateCheckedItems(activeSecurityModal, checkedItems);
                        formik.setFieldTouched(
                           EligibilitySecurity[activeSecurityModal].formFieldName,
                           true,
                           true
                        );
                        setActiveSecurityModal(null);
                     }}
                     items={securityDocuments[activeSecurityModal ?? 'other'].map(({ name, checked }) => ({
                        labelName: name,
                        checked,
                     }))}
                     onAddNewValue={(value) => addNewSecurityValue(activeSecurityModal, value)}
                     headerText={EligibilitySecurity[activeSecurityModal ?? 'other'].modalTitle}
                     addButtonText={EligibilitySecurity[activeSecurityModal ?? 'other'].modalButtonText}
                  />
               )}
            </>
         )}
      </>
   );
};

export default Security;
