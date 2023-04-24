import { Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GoBack() {
  return (
    <Link to="/">
      <Box display={'flex'} alignItems={'flex-start'}>
      <ArrowBackIcon fontSize="medium"  />
      <Typography sx={{ mb: 2, marginLeft:1 }} >
         Go back to ments
      </Typography>
      </Box>
    </Link>
  );
};


