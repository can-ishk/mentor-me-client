import { Button, TextField } from "@mui/material";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateMent = () => {
  const navigate = useNavigate();
  // return (
  //   <Button
  //     variant="outlined"
  //     size="medium"
  //     onClick={() => navigate("/ments/create")}
  //     sx={{
  //       gap: "0.2rem",
  //       whiteSpace: "nowrap",
  //     }}
  //   >
  //     <AiOutlinePlus style={{ flexShrink: 0 }} />
  //     <span>New Ment</span>
  //   </Button>
  // );

  return(
    <TextField
      onFocus={() => navigate("/ments/create")}
      size="small"
      fullWidth
      sx={{
        // gap: "0.2rem",
        whiteSpace: "nowrap",
        '& fieldset': {
          marginRight: 1
      },
      }}
      placeholder="Create Ment"
    />
  )
};

export default CreateMent;
