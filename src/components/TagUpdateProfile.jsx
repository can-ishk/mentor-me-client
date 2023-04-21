import React, { useState } from "react";
import { Box } from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import "./tags.css";

export default function TagUpdateProfile(props){
  

  return (
    <Box>
      <TagsInput
        value={props.get}
        onChange={props.set}
        name="tags"
        placeHolder="Add a tag!"
      />
    </Box>
  );
};



