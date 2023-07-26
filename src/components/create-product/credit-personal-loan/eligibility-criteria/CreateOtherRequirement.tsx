import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Grid, InputAdornment } from '@mui/material';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/personal-loan/create-other-requirement';
import { Button } from '@app/components/atoms/Button';
import RequiredIndicator from '@app/components/atoms/RequiredIndicator';
import { CounterControl } from '@app/components/forms/CounterControl';
import { API_PATH, Periodicity } from '@app/constants';
import { Icon } from '@app/components/atoms/Icon';
import { DocumentFormatContainer, DocumentFormat } from '@app/components/atoms/DocumentFormat';
import { InputErrorText } from '@app/components';
import React from 'react';
import AddDocumentFormat from './AddDocumentFormat';
import Dialog from '@app/components/atoms/Dialog';
import { useRequest } from 'react-http-query';
import { ObjectAny } from '@app/@types';
import { useOtherRequirementContext } from '@app/providers/eligibility-criteria-other-requirement-provider';

const CreateOtherRequirement: React.FC<{ onCompleted: () => void }> = ({ onCompleted }) => {
   const { handleAddNewRequirement } = useOtherRequirementContext();

   const { InputFieldNames } = FormMeta;
   const [openAddFormat, setOpenAddFormat] = React.useState(false);

   const handleOpen = () => setOpenAddFormat(true);
   const handleClose = () => setOpenAddFormat(false);

   const updateSelectedFormat = (formik: any, item: string) => {
      const format = formik.values[InputFieldNames.ADD_FORMAT].split(',').filter((e: string) => e != item);
      formik.setFieldValue(InputFieldNames.ADD_FORMAT, format.toString());
   };

   const [, postCreateOtherRequirement] = useRequest({
      onSuccess(response) {
         const data = response.other_eligibility_req;
         // eslint-disable-next-line camelcase
         handleAddNewRequirement({ ...data, accepted_format: data.accepted_format.join(',') });
      },
   });
   const onSubmit = (values: ObjectAny) => {
      postCreateOtherRequirement(API_PATH.OTHER_ELIGIBILTY_REQUIREMENT, {
         body: {
            ...values,
            [InputFieldNames.ADD_FORMAT]: values[InputFieldNames.ADD_FORMAT].split(','),
            [InputFieldNames.PERIODICITY_PERIOD]: values[InputFieldNames.PERIODICITY_PERIOD].toLowerCase(),
         },
      });

      onCompleted();
   };
   return (
      <Box width="75%" mx="auto">
         <Formik
            initialValues={FormMeta.initialValues()}
            validationSchema={FormMeta.validator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <Grid container mb={4}>
                           <Grid item xs={4} pr={3}>
                              Requirement Title
                              <RequiredIndicator />
                           </Grid>
                           <Grid item xs={8}>
                              <FormControlBase control="input" name={InputFieldNames.TITLE} />
                           </Grid>
                        </Grid>
                        <Grid container mb={4}>
                           <Grid item xs={4} pr={3}>
                              Requirement Description
                              <RequiredIndicator />
                           </Grid>
                           <Grid item xs={8}>
                              <FormControlBase
                                 variant="outlined"
                                 control="input"
                                 placeholder="Enter requirement description"
                                 rows={4}
                                 multiline
                                 sx={{
                                    '& .MuiOutlinedInput-root': {
                                       flexDirection: 'column',
                                       alignItems: 'end',
                                    },
                                 }}
                                 name={InputFieldNames.DESCRIPTION}
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          {`${formik.values[InputFieldNames.DESCRIPTION].length}/160`}
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </Grid>
                        </Grid>
                        <Grid container mb={4}>
                           <Grid item xs={4} pr={3}>
                              Periodicity
                           </Grid>

                           <Grid item xs={2} pr={2}>
                              <CounterControl name={InputFieldNames.PERIODICITY_NUM_START} formik={formik} />
                           </Grid>
                           <Grid item xs={0.5}>
                              -
                           </Grid>
                           <Grid item xs={2.5} pr={2}>
                              <CounterControl name={InputFieldNames.PERIODICITY_NUM_END} formik={formik} />
                           </Grid>
                           <Grid item xs={3} pr={2}>
                              <FormControlBase
                                 control="select"
                                 name={InputFieldNames.PERIODICITY_PERIOD}
                                 placeholder="Select period"
                                 options={Periodicity}
                              />
                           </Grid>
                        </Grid>
                        <FormControlWrapper
                           sx={{ mb: 4 }}
                           name={InputFieldNames.SET_FORMAT}
                           label="Are documents required for this eligibility requirement?"
                           layout="horizontal"
                        >
                           <FormControlBase
                              sx={{ ml: 7 }}
                              name={InputFieldNames.SET_FORMAT}
                              control="switch"
                           />
                        </FormControlWrapper>
                        {formik.values[InputFieldNames.SET_FORMAT] && (
                           <Grid container mb={4}>
                              <Grid item xs={4} pr={3}>
                                 Accepted Format
                                 <RequiredIndicator />
                              </Grid>
                              <Grid item xs={8}>
                                 {formik.values[InputFieldNames.ADD_FORMAT] && (
                                    <DocumentFormatContainer>
                                       <Grid container>
                                          {formik.values[InputFieldNames.ADD_FORMAT]
                                             .split(',')
                                             .map((item: string, index: number) => (
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

                                 <Button
                                    variant="text"
                                    color="inherit"
                                    sx={{ p: 2, pl: 0 }}
                                    onClick={handleOpen}
                                 >
                                    <Icon type="add-circle" sx={{ mr: 1 }} /> Add more formats
                                 </Button>
                                 {!formik.values[InputFieldNames.ADD_FORMAT] && (
                                    <InputErrorText errorText={'Add accepted formats'} />
                                 )}
                              </Grid>
                           </Grid>
                        )}
                     </Box>
                     <Box textAlign="center" mt={5} mb={2}>
                        <Button
                           type="submit"
                           sx={{ ml: 2 }}
                           color="primary"
                           disabled={!formik.dirty || !formik.isValid}
                        >
                           Next
                        </Button>
                     </Box>
                     <Dialog
                        minWidth="30%"
                        open={openAddFormat}
                        handleClose={handleClose}
                        title="Documents formats"
                     >
                        <AddDocumentFormat
                           handleSelected={(selected) => {
                              formik.setFieldValue(InputFieldNames.ADD_FORMAT, selected.toString());
                              handleClose();
                           }}
                           selectAddDocumentFormat={
                              formik.values[InputFieldNames.ADD_FORMAT]
                                 ? formik.values[InputFieldNames.ADD_FORMAT].split(',')
                                 : []
                           }
                        />
                     </Dialog>
                  </Form>
               );
            }}
         </Formik>
      </Box>
   );
};

export default CreateOtherRequirement;
