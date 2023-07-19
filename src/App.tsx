import React, { useState } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { GlobalTheme } from '@app/utils';
import Accordion from './components/accordion/Accordion'
import { Chip } from './components/atoms/Chip'
import NestedDropdown from './components/atoms/NestedDropdown'
import LinearGradient from './components/atoms/LinearGradient';
import ReusableModal from './components/modal/ModalWithCheckBoxList/Modal'


const App = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [mainListData, setMainListData] = useState([
    {
      labelName: 'Charge on deposit1',
      checked: false,
      children: [
        {
          name: 'child name 1',
          checked: false,
        },
        {
          name: 'child name 2',
          checked: false,
        },
      ],
    },
    {
      labelName: 'Deposit1',
      checked: false,
      children: [
        {
          name: 'child name 1',
          checked: false,
        },
        {
          name: 'child name 2',
          checked: false,
        },
      ],
    },
    {
      labelName: 'Charge on deposit2',
      checked: false,
      children: [
        {
          name: 'child name 1',
          checked: false,
        },
        {
          name: 'child name 2',
          checked: false,
        },
      ],
    },
    {
      labelName: 'Deposit2',
      checked: false,
      children: [
        {
          name: 'child name 1',
          checked: false,
        },
        {
          name: 'child name 2',
          checked: false,
        },
      ],
    },
    {
      labelName: 'Charge on deposit3',
      checked: false,
      children: [
        {
          name: 'child name 1',
          checked: false,
        },
        {
          name: 'child name 2',
          checked: false,
        },
      ],
    },
    {
      labelName: 'Deposit3',
      checked: false,
      children: [
        {
          name: 'child name 1',
          checked: false,
        },
        {
          name: 'child name 2',
          checked: false,
        },
      ],
    },
    {
      labelName: 'Charge on deposit4',
      checked: false,
      children: [
        {
          name: 'child name 1',
          checked: false,
        },
        {
          name: 'child name 2',
          checked: false,
        },
      ],
    },
    {
      labelName: 'Deposit4',
      checked: false,
      children: [
        {
          name: 'child name 1',
          checked: false,
        },
        {
          name: 'child name 2',
          checked: false,
        },
      ],
    },
  ]);

  const handleAddCharge = (chargeName: string) => {
    const newCharge = {
      labelName: chargeName,
      checked: false,
      children: [],
    };

    // Update the main list with the new charge at the top
    setMainListData((prevListData) => [newCharge, ...prevListData]);
  };

  const handleCheckboxToggle = (labelName: string) => {
    const updatedListData = mainListData.map((item) =>
      item.labelName === labelName ? { ...item, checked: !item.checked } : item
    );
    setMainListData(updatedListData);
  };

  const handleChildCheckboxToggle = (labelName: string, childIndex: number) => {
    const parentItem = mainListData.find((item) => item.labelName === labelName);
    if (!parentItem) return;

    const updatedChildren = parentItem.children.map((child, index) =>
      index === childIndex ? { ...child, checked: !child.checked } : child
    );

    const updatedParentItem = { ...parentItem, children: updatedChildren };
    const updatedListData = mainListData.map((item) =>
      item.labelName === labelName ? updatedParentItem : item
    );

    setMainListData(updatedListData);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <ThemeProvider theme={GlobalTheme}>
      <CssBaseline />
      <AppRoutes />
      <Accordion accordionLabels={['Label 1', 'Label 2']}>
        <Chip />
        <Chip />
      </Accordion>
      <CssBaseline />
      <LinearGradient />

      <NestedDropdown />

      <button onClick={handleOpenModal}>Open Modal</button>
      <ReusableModal
        open={modalOpen}
        onClose={handleCloseModal}
        listData={mainListData}
        onAddCharge={handleAddCharge}
        onCheckboxToggle={handleCheckboxToggle}
        onChildCheckboxToggle={handleChildCheckboxToggle}
        headerText="Your Modal Header Text"
        createChargeText="Your Create Charge Text"
      />
    </ThemeProvider >
  )
}
export default App;
