import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import GridLayout from "../components/GridLayout";
import NavBar from "../components/NavBar";
import MentBrowser from "../components/MentBrowser";
import Sidebar from "../components/Sidebar";

const Search = () => {
  return (
    <Container>
      <NavBar />
      <GridLayout
        left={
          <Stack spacing={2}>
            <MentBrowser createMent contentType="ments" />
          </Stack>
        }
        right={<Sidebar />}
      />
    </Container>
  );
};

export default Search;
