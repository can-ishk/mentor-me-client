import { Stack } from "@mui/material";
import React from "react";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import TopMents from "./TopMents";

const Sidebar = () => {
  return (
    <Stack spacing={2}>
      <TopMents />
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
