import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Grid } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import { Button } from '@app/components/atoms/Button';
import RequiredIndicator from '@app/components/atoms/RequiredIndicator';
import { CounterControl } from '@app/components/forms/CounterControl';
import { Periodicity } from '@app/constants';
import { Icon } from '@app/components/atoms/Icon';
import React, { useEffect } from 'react';
import Dialog from '@app/components/atoms/Dialog';
import AddDocumentFormat from './AddDocumentFormat';
import { DocumentFormatContainer, DocumentFormat } from '@app/components/atoms/DocumentFormat';
import { useFormikValue } from '@app/hooks';
import { InputErrorText } from '@app/components';
import { ObjectAny } from '@app/@types';
import { FormikProps } from 'formik';
import { capitalizeString } from '@app/helper/string';

const ConfigureRequirementForm: React.FC<{
   name: string;
   formik: FormikProps<any>;
   requirement: ObjectAny;
}> = ({ name, formik, requirement }) => {
   const { InputFieldNames } = FormMeta;
   const getFieldValue = useFormikValue(formik, name);

   const [openAddFormat, setOpenAddFormat] = React.useState(false);
   const [isFormatSelected, setIsFormatSelected] = React.useState(false);
   const handleOpen = () => {
      setOpenAddFormat(true);
   };

   const handleClose = () => {
      setOpenAddFormat(false);
   };

   let formats =
      getFieldValue(InputFieldNames.ADD_FORMAT) ?? requirement[InputFieldNames.ADD_FORMAT];
   const setFormat = getFieldValue(InputFieldNames.SET_FORMAT);

   const updateSelectedFormat = (formik: any, item: string) => {
      const format = formats.split(',').filter((e: string) => e != item);
      formik.setFieldValue(`${name}${InputFieldNames.ADD_FORMAT}`, format.toString());
      formats = getFieldValue(InputFieldNames.ADD_FORMAT);
   };
   const allFields = [
      InputFieldNames.SET_FORMAT,
      InputFieldNames.PERIODICITY_NUM_START,
      InputFieldNames.PERIODICITY_NUM_END,
      InputFieldNames.ADD_FORMAT,
   ];
   useEffect(() => {
      allFields.forEach((e) => formik.setFieldValue(`${name}${e}`, requirement[e]));
      formik.setFieldValue(
         `${name}${InputFieldNames.PERIODICITY_PERIOD}`,
         capitalizeString(requirement[InputFieldNames.PERIODICITY_PERIOD])
      );
   }, []);

   return (
      <Box>
         <Box sx={{ mb: 3 }}>
            <Grid container mb={2}>
               <Grid item xs={4} pr={3}>
                  Periodicity
               </Grid>

               <Grid item xs={2} pr={2}>
                  <CounterControl
                     defaultValue={requirement[InputFieldNames.PERIODICITY_NUM_START]}
                     name={`${name}${InputFieldNames.PERIODICITY_NUM_START}`}
                     formik={formik}
                  />
               </Grid>
               <Grid item xs={0.5}>
                  -
               </Grid>
               <Grid item xs={2.5} pr={2}>
                  <CounterControl
                     defaultValue={requirement[InputFieldNames.PERIODICITY_NUM_END]}
                     name={`${name}${InputFieldNames.PERIODICITY_NUM_END}`}
                     formik={formik}
                  />
               </Grid>
               <Grid item xs={3} pr={2}>
                  <FormControlBase
                     control="select"
                     defaultValue={requirement[InputFieldNames.PERIODICITY_PERIOD]}
                     name={`${name}${InputFieldNames.PERIODICITY_PERIOD}`}
                     placeholder="Select period"
                     options={Periodicity}
                  />
               </Grid>
            </Grid>
            <FormControlWrapper
               sx={{ mb: 4 }}
               defaultValue={requirement[InputFieldNames.SET_FORMAT]}
               name={`${name}${InputFieldNames.SET_FORMAT}`}
               label="Are documents required for this eligibility requirement?"
               layout="horizontal"
            >
               <FormControlBase
                  sx={{ ml: 7 }}
                  name={`${name}${InputFieldNames.SET_FORMAT}`}
                  control="switch"
               />
            </FormControlWrapper>
            {setFormat && (
               <Grid container mb={4}>
                  <Grid item xs={4} pr={3}>
                     Accepted Format
                     <RequiredIndicator />
                  </Grid>
                  <Grid item xs={8}>
                     {formats && (
                        <DocumentFormatContainer>
                           <Grid container>
                              {formats.split(',').map((item: string, index: number) => (
                                 <Grid key={index + item} mb={1}>
                                    <DocumentFormat>
                                       {item}
                                       <Icon
                                          cursor="pointer"
                                          onClick={() => updateSelectedFormat(formik, item)}
                                          color="primary"
                                          sx={{ fontSize: '1rem' }}
                                          type="close"
                                       />
                                    </DocumentFormat>
                                 </Grid>
                              ))}
                           </Grid>
                        </DocumentFormatContainer>
                     )}

                     <Button variant="text" color="inherit" sx={{ p: 2, pl: 0 }} onClick={handleOpen}>
                        <Icon type="add-circle" sx={{ mr: 1 }} /> Add more formats
                     </Button>
                     {!formats && !isFormatSelected && <InputErrorText errorText={'Add accepted formats'} />}
                  </Grid>
               </Grid>
            )}
         </Box>
         <Dialog minWidth="30%" open={openAddFormat} handleClose={handleClose} title="Documents formats">
            <AddDocumentFormat
               handleSelected={(selected) => {
                  formik.setFieldValue(`${name}${InputFieldNames.ADD_FORMAT}`, selected.toString());
                  handleClose();
                  setIsFormatSelected(true);
               }}
               selectAddDocumentFormat={formats ? formats.split(',') : []}
            />
         </Dialog>
      </Box>
   );
};

export default ConfigureRequirementForm;
