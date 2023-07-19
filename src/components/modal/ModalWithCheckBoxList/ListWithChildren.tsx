import React from 'react';
import { Box, Typography } from '@mui/material';

import Checkbox from '../../atoms/Checkbox'

interface ListItem {
    labelName: string;
    checked: boolean;
    children: { name: string; checked: boolean }[];
}

interface ListWithChildrenProps {
    listData: ListItem[];
    onCheckboxToggle: (labelName: string) => void;
    onChildCheckboxToggle: (labelName: string, childIndex: number) => void;
}

export const ListWithChildren: React.FC<ListWithChildrenProps> = ({ listData, onCheckboxToggle, onChildCheckboxToggle }) => {
    return (
        <Box sx={{ maxHeight: '20vh', overflowY: 'auto',  margin: "5% 0% "   }}>
            {listData.map((item) => (
                <Box key={item.labelName}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            checked={item.checked}
                            onChange={() => onCheckboxToggle(item.labelName)}
                        />
                        <Typography>{item.labelName}</Typography>
                    </Box>
                    {item.checked &&
                        item.children.map((child, childIndex) => (
                            <Box key={child.name} ml={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    checked={child.checked}
                                    onChange={() => onChildCheckboxToggle(item.labelName, childIndex)}
                                />
                                <Typography>{child.name}</Typography>
                            </Box>
                        ))}
                </Box>
            ))}
        </Box>
    );
};
