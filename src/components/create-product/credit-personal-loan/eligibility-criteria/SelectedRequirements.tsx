import { Button } from '@app/components/atoms/Button';
import { Colors } from '@app/constants';
import { Grid, Box, Divider, List, ListItem } from '@mui/material';
import { Draggable, DraggableProvided, Droppable } from 'react-beautiful-dnd';
import ConfigureRequirement from './ConfigureRequirement';
import React from 'react';
import Dialog from '@app/components/atoms/Dialog';

interface SelectedRequirementsProps {
   requirements: string[];
   handleClearSelection: () => void;
}
const SelectedRequirements: React.FC<SelectedRequirementsProps> = ({
   requirements,
   handleClearSelection,
}) => {
   const [requirementDialog, setOpenRequirementDialog] = React.useState(false);
   const handleOpen = () => {
      setOpenRequirementDialog(true);
   };
   const handleClose = () => {
      setOpenRequirementDialog(false);
   };
   return (
      <>
         <Box textAlign="end">
            <Button variant="text" sx={{ px: 0, textDecoration: 'underline' }} onClick={handleClearSelection}>
               Clear selection
            </Button>
         </Box>
         <Box sx={{ border: `1px solid ${Colors.LightGray}`, py: 2, borderRadius: '5px', minHeight: '90%' }}>
            <Grid container sx={{ px: 2, pb: 2 }}>
               <Grid item xs={2}>
                  S/N
               </Grid>
               <Grid item xs={10}>
                  Requirements
               </Grid>
            </Grid>

            <Box sx={{ maxHeight: '400px', overflow: 'hidden' }}>
               <Droppable droppableId="droppable-list-right">
                  {(provided) => (
                     <List className="fancy-scrollbar" {...provided.droppableProps} ref={provided.innerRef}>
                        {requirements.map((item, index) => (
                           <Draggable draggableId={item} key={index} index={index}>
                              {(provided: DraggableProvided) => (
                                 <>
                                    <ListItem
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       sx={{ p: 0, pt: 1 }}
                                    >
                                       <Grid container sx={{ px: 2 }}>
                                          <Grid item xs={2}>
                                             {index + 1}
                                          </Grid>
                                          <Grid item xs={10} fontSize="16px">
                                             {item}
                                             <Button
                                                variant="outlined"
                                                color="primary"
                                                sx={{ py: 0, px: 1, ml: 2 }}
                                                onClick={handleOpen}
                                             >
                                                Configure requirement
                                             </Button>
                                          </Grid>
                                       </Grid>
                                    </ListItem>
                                    <Box sx={{ px: 2, py: 1 }}>
                                       <Divider />
                                    </Box>
                                    <Dialog
                                       open={requirementDialog}
                                       handleClose={handleClose}
                                       title="CONFIGURE NEW REQUIREMENT"
                                    >
                                       <ConfigureRequirement title={item} />
                                    </Dialog>
                                 </>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </List>
                  )}
               </Droppable>
            </Box>
         </Box>
      </>
   );
};

export default SelectedRequirements;
