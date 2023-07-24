import { Grid } from '@mui/material';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Requirements from './Requirements';
import SelectedRequirements from './SelectedRequirements';

const AddOtherRequirements: React.FC = () => {
   const [items, setItems] = React.useState(dummyRequirements);
   const [droppedItems, setDroppedItems] = React.useState<string[]>([]);

   const handleDragEnd = (result: any) => {
      if (!result.destination) return;
      const { source, destination } = result;
      if (source.droppableId === destination.droppableId) {
         const newItems = Array.from(items);
         const [reorderedItem] = newItems.splice(result.source.index, 1);
         newItems.splice(result.destination.index, 0, reorderedItem);
         setItems(newItems);
      } else if (destination.droppableId === 'droppable-list-right') {
         const draggedItem = items[result.source.index];
         setItems((prev) => prev.filter((ele) => ele != draggedItem));
         setDroppedItems((prev) => [...prev, draggedItem]);
      }
   };

   return (
      <DragDropContext onDragEnd={handleDragEnd}>
         <Grid container>
            <Grid item xs={4} pr={2}>
               <Requirements
                  requirements={items}
                  handleSearch={(searchText) => {
                     setItems(items.filter((item) => item.toLowerCase().includes(searchText.toLowerCase())));
                  }}
               />
            </Grid>
            <Grid item xs={8}>
               <SelectedRequirements
                  requirements={droppedItems}
                  handleClearSelection={() => {
                     setItems(dummyRequirements);
                     setDroppedItems([]);
                  }}
               />
            </Grid>
         </Grid>
      </DragDropContext>
   );
};

export default AddOtherRequirements;

const dummyRequirements = [
   'Account Ownership',
   'Income Bracket',
   'Pay Slip',
   'Period of Employment',
   'Salaries and Emoluments',
   'Credit Insurance',
   'Employer',
   'Letter of Employment',
   'Letter of Undertaking',
   'Life Insurance Policy',
   'Proof of Income',
   'Reputable Firm Affliation',
];
