import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export default function ContentUpdateEditor(props){
  const [content, setContent] = useState(props.originalContent);
  const [selected, setSelected] = useState(props.originalSelected)
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    let error = null;

    if (props.validate) {
      error = props.validate(content);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
        <TextField
          value={content}
          fullWidth
          margin="normal"
          name="content"
          sx={{ backgroundColor: "divider" }}
          onChange={handleChange}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        {props.tags}
        <Button
          type="submit"
          variant="outlined"
          sx={{ backgroundColor: "divider", mt: 1 }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};


