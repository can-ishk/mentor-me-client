import { Avatar } from "@mui/material";
import React from "react";

const UAvatar = ({ username, height, width }) => {
  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "lightgray",
      }}
      src={"https://robohash.org/" + username}
    />
  );
};

export default UAvatar;
