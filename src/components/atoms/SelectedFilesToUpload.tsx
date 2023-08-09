import { Box, Grid, IconButton, List, ListItem } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Colors } from '@app/constants/colors';
import { InputSuccessText } from '../forms/InputFieldError';

export const SelectedFilesToUpload: React.FC<{
   filesMeta: Array<{ name: string; url: string }>;
   handleRemoveFile: (name: string) => void;
}> = ({ filesMeta, handleRemoveFile }) => {
   return (
      <List
         className="fancy-scrollbar"
         sx={{
            height: '80px',
            overflow: 'auto',
            width: 'max-content',
            mx: 'auto',
            px: '20px',
            pt: 0,
         }}
      >
         {filesMeta.map(({ name, url }, id) => (
            <ListItem key={name + id} sx={{ p: 0 }}>
               <Box sx={{ width: '300px', mx: 'auto', mb: 1 }}>
                  <Box
                     sx={{
                        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        p: 1,
                        fontSize: 14,
                        border: `1px solid ${Colors.Success}`,
                     }}
                  >
                     <Grid container>
                        <Grid
                           item
                           xs={8}
                           component="a"
                           href={url}
                           target="_blank"
                           sx={{
                              textDecoration: 'none',
                              color: 'inherit',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                           }}
                        >
                           <IconButton sx={{ background: '#F2F4F7', mr: 2 }}>
                              <InsertDriveFileOutlinedIcon />
                           </IconButton>
                           {name}
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                           <IconButton onClick={() => handleRemoveFile(name)}>
                              <DeleteOutlineOutlinedIcon />
                           </IconButton>
                        </Grid>
                     </Grid>
                  </Box>
                  <InputSuccessText successText="File uploaded succesfully" />
               </Box>
            </ListItem>
         ))}
      </List>
   );
};
