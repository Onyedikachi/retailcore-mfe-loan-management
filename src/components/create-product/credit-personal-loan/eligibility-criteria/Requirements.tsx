import { SearchInput } from '@app/components/atoms';
import DragContainer from '@app/components/atoms/DragContainer';
import { Icon } from '@app/components/atoms/Icon';
import { Colors } from '@app/constants';
import { Typography, Box, Divider, List, ListItem, Button } from '@mui/material';
import { Droppable, Draggable, DraggableProvided } from 'react-beautiful-dnd';

interface RequirementsProps {
   requirements: string[];
   handleSearch: (searchBy: string) => void;
}
const Requirements: React.FC<RequirementsProps> = ({ requirements, handleSearch }) => {
   return (
      <Box sx={{ border: `1px solid ${Colors.LightGray}`, py: 1, borderRadius: '5px' }}>
         <Box sx={{ px: 2 }}>
            <Typography fontWeight="bold">Drag & Drop Requirements</Typography>
            <Divider sx={{ mt: 0.5, width: '80%' }} />
            <Box py={2}>
               <SearchInput placeholder="Search" handleSearch={handleSearch} />
            </Box>
         </Box>
         <Box sx={{ height: '400px', overflow: 'hidden' }}>
            <Droppable droppableId="droppable-list">
               {(provided) => (
                  <List {...provided.droppableProps} ref={provided.innerRef} sx={{ px: 2 }}>
                     {requirements.map((item, index) => (
                        <Draggable draggableId={item} key={item} index={index}>
                           {(provided: DraggableProvided) => (
                              <ListItem
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 sx={{ p: 0 }}
                                 key={item}
                              >
                                 <DragContainer text={item} />
                              </ListItem>
                           )}
                        </Draggable>
                     ))}
                     {provided.placeholder}
                  </List>
               )}
            </Droppable>
         </Box>
         <Button variant="text" color="inherit" sx={{ p: 2, pb: 0, fontWeight: 'bold' }}>
            <Icon type="add-circle" sx={{ mr: 1 }} /> Create new requirements
         </Button>
      </Box>
   );
};

export default Requirements;
