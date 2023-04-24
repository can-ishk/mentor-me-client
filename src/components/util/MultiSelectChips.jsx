import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Autocomplete, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, itemName, theme) {
    return {
        fontWeight:
            itemName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultiSelectChip({ label, items, getter, setter }) {
    const theme = useTheme();
    const [itemName, setitemName] = [getter, setter];
    //console.log(itemName)
    const handleChange = (_, value) => {
        // setitemName()
        if(value.length>itemName.length) value[value.length-1] = value[value.length-1].value 
        //console.log(value, "hi")
        setitemName(value)
        //console.log(itemName)
    };

    return (
        <Box marginTop={1}>
                <Autocomplete
                    multiple
                    options={items}
                    value={itemName}
                    onChange={handleChange}
                    filterSelectedOptions
                    getOptionDisabled={(option) =>
                        option in itemName
                      }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder="Enter Skill"
                        />
                    )}
                />
        </Box>
    );
}
