import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, Popover, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button } from './Button';
import { Colors } from '@app/constants';


interface SubMenuOption {
  label: string;
  showRightArrow?: boolean;
}

interface MainMenuOption {
  label: string;
  subMenuOptions: SubMenuOption[];
}

const NestedDropdown: React.FC = () => {
  const customStyle: React.CSSProperties = {
    color: Colors.TextGray,
    fontFamily: 'Inter',
    fontSize: '38px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '48px',
    letterSpacing: '-0.836px',
    marginRight: '30px',

  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [subSubMenuOpen, setSubSubMenuOpen] = useState(false);
  const [subSubMenuAnchorEl, setSubSubMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSubMenuOption, setSelectedSubMenuOption] = useState<string | null>(null);

  const mainMenuOptions: MainMenuOption[] = [
    {
      label: 'Deposit',
      subMenuOptions: [
        { label: 'Savings', showRightArrow: false },
        { label: 'Current', showRightArrow: false },
        { label: 'Term Deposit', showRightArrow: false },
      ],
    },
    {
      label: 'Credit',
      subMenuOptions: [
        { label: 'Personal Loans', showRightArrow: false },
        { label: 'Commercial', showRightArrow: true },
      ],
    },
    {
      label: 'Payment',
      subMenuOptions: [
        { label: 'Digital Channel', showRightArrow: true },
        { label: 'Over the Counter', showRightArrow: true },
        { label: 'Cheques/Physical Instructions', showRightArrow: true },
      ],
    },
    {
      label: 'Investment',
      subMenuOptions: [{ label: 'Non', showRightArrow: true }],
    },
  ];

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMainMenuClick = (option: string, event: React.MouseEvent<HTMLElement>) => {
    setSelectedOption(option);
    setSubMenuOpen(true);
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleSubMenuClick = (option: string) => (event: React.MouseEvent<HTMLElement>) => {
    setSelectedSubMenuOption(option);
    setSubSubMenuOpen(true);
    setSubSubMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuOpen(false);
    setSubMenuAnchorEl(null);
    setSubSubMenuOpen(false);
    setSubSubMenuAnchorEl(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Typography variant="inherit" style={customStyle}>
        Product Factory
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleButtonClick}>
        Create New Product
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {mainMenuOptions.map((mainMenuOption) => (
          <MenuItem key={mainMenuOption.label} onClick={(event) => handleMainMenuClick(mainMenuOption.label, event)}>
            {mainMenuOption.label}
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
      <Popover
        open={subMenuOpen}
        anchorEl={subMenuAnchorEl}
        onClose={() => setSubMenuOpen(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: subMenuAnchorEl ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        {selectedOption &&
          mainMenuOptions.find((option) => option.label === selectedOption)?.subMenuOptions.map((subOption) => (
            <MenuItem
              key={subOption.label}
              onClick={subOption.showRightArrow ? handleSubMenuClick(subOption.label) : handleClose}
            >
              <Typography variant="inherit">
                {subOption.label}
              </Typography>
              {subOption.showRightArrow && (
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
              )}
            </MenuItem>
          ))}
      </Popover>
      <Popover
        open={subSubMenuOpen}
        anchorEl={subSubMenuAnchorEl}
        onClose={() => setSubSubMenuOpen(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: subSubMenuAnchorEl ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        {selectedSubMenuOption === 'Commercial' && (
          <>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                SME's loans
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Corporate loans
              </Typography>
            </MenuItem>
          </>
        )}
        {selectedSubMenuOption === 'Digital Channel' && (
          <>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Cash withdrawal
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Within bank transfer
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Other bank transfer
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                International transfer
              </Typography>
            </MenuItem>
          </>
        )}
        {selectedSubMenuOption === 'Over the Counter' && (
          <>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Cash withdrawal
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Within bank transfer
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Other bank transfer
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                International transfer
              </Typography>
            </MenuItem>
          </>
        )}
        {selectedSubMenuOption === 'Cheques/Physical Instructions' && (
          <>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Personal Cheques
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="inherit">
                Manager Cheques
              </Typography>
            </MenuItem>
          </>
        )}
      </Popover>
    </div>
  );
};

export default NestedDropdown;