import { MenuItem, Select, Typography, InputLabel, FormControl } from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";

const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  return (
    <HorizontalStack spacing={1}>
      <FormControl>

      <InputLabel>
        Sort by:
      </InputLabel>
      <Select
        size="small"
        value={sorts[sortBy]}
        onChange={onSortBy}
        autoWidth
        label={"Sort by:"}
        >
        {Object.keys(sorts).map((sortName, i) => (
          <MenuItem value={sorts[sortName]} key={i}>
            {sorts[sortName]}
          </MenuItem>
        ))}
      </Select>
        </FormControl>
    </HorizontalStack>
  );
};

export default SortBySelect;
