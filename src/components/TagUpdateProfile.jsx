import React, { useState } from "react";
import { Box } from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import "./tags.css";

export default function TagUpdateProfile({handleSubmit}){
  const [selected, setSelected] = useState([]);

  return (
    <Box component={'form'} onSubmit = {handleSubmit}>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="tags"
        placeHolder="Add a tag!"
      />
    </Box>
  );
};



