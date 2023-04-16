import { useTheme } from "@emotion/react";
import { autocompleteClasses, Box, Card, CardActionArea } from "@mui/material";
import React from "react";
import "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MentContentBox(props) {
  const { clickable, ment, editing } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {clickable && !editing ? (
        <Box
          sx={{
            padding: theme.spacing(2),
            width: "100%",
            margin: "auto",
            "&:hover": { backgroundColor: "divider", cursor: "pointer" },
          }}
          onClick={() => navigate("/ments/" + ment._id)}
        >
          {props.children}
        </Box>
      ) : (
        <Box sx={{ padding: theme.spacing(2), width: "90%" }}>
          {props.children}
        </Box>
      )}
    </>
  );
};