import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function GoBack(){
  return (
    <Typography sx={{ mb: 2 }}>
      <Link to="/"> &lt;&lt; Go back to ments</Link>
    </Typography>
  );
};


