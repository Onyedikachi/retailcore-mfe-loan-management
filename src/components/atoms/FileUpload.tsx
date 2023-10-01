import { Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { FileUploader } from 'react-drag-drop-files';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import React from 'react';
import { InputErrorText } from '../forms/InputFieldError';
import { Field, FieldProps, useFormikContext } from 'formik';
import { SelectedFilesToUpload } from './SelectedFilesToUpload';
interface FileUploadProps {
   fileTypes: string[];
   multiple?: boolean;
   maxSize?: number;
   name: string;
   onSizeError?: (file: File | undefined) => void;
}
export const FileUpload: React.FC<FileUploadProps> = (props) => {
   const [fileSizeError, setFileSizeError] = React.useState<string>();
   const [fileTypeError, setFileTypeError] = React.useState<string>();
   const [filesMeta, setFilesMeta] = React.useState<Array<{ name: string; url: string }>>([]);

   const { getFieldProps, setFieldValue } = useFormikContext();
   const filesUploaded = getFieldProps(props.name)?.value as FileList;

   React.useEffect(() => {
      setFilesMeta(
         Array.from(filesUploaded ?? []).map((file) => ({ name: file.name, url: URL.createObjectURL(file) }))
      );
   }, [filesUploaded, setFilesMeta]);

   const handleRemoveFile = (name: string) => {
      const updatedFile = Array.from(filesUploaded ?? []).filter((file) => file.name != name);
      setFieldValue(props.name, updatedFile);
      if (updatedFile.length === 0) {
         setFileSizeError('');
         setFileTypeError('');
      }
   };

   return (
      <Field name={props.name}>
         {({ field, form }: FieldProps) => {
            return (
               <>
                  {filesMeta.length == 0 ? (
                     <FileUploader
                        handleChange={(file: File | undefined) => form.setFieldValue(props.name, file)}
                        {...field}
                        types={props.fileTypes}
                        maxSize={props.maxSize}
                        multiple={props.multiple}
                        onSizeError={(file: string) => setFileSizeError(file)}
                        onTypeError={(file: string) => setFileTypeError(file)}
                     >
                        <Box
                           boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.1)"
                           borderRadius="10px"
                           width="300px"
                           sx={{ cursor: 'pointer', fontSize: 14, p: 1, mx: 'auto' }}
                        >
                           <Box display="flex" gap={2} alignItems="center">
                              <Typography>
                                 <IconButton sx={{ background: '#F2F4F7' }}>
                                    <BackupOutlinedIcon />
                                 </IconButton>
                              </Typography>
                              <Typography>
                                 <Typography component="span" color="primary.main" mr={0.5}>
                                    Click to upload
                                 </Typography>
                                 or drag and drop{' '}
                                 {props.fileTypes.map((str) => '.' + str.toLowerCase()).join(', ')}
                              </Typography>
                           </Box>
                        </Box>
                        {fileSizeError && (
                           <InputErrorText
                              sx={{ mt: 1, textAlign: 'center' }}
                              errorText={`${fileSizeError.replace('big', 'large')}, maximum file size is ${
                                 props.maxSize
                              }mb`}
                           />
                        )}
                        {fileTypeError && (
                           <InputErrorText
                              sx={{ mt: 1, textAlign: 'center' }}
                              errorText={`${fileTypeError}, accepted types are ${props.fileTypes.toString()}`}
                           />
                        )}
                     </FileUploader>
                  ) : (
                     <SelectedFilesToUpload filesMeta={filesMeta} handleRemoveFile={handleRemoveFile} />
                  )}
               </>
            );
         }}
      </Field>
   );
};
