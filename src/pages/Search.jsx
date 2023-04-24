import { Container, Stack } from "@mui/material";
import React from "react";

import GridLayout from "../components/GridLayout";
import MentBrowser from "../components/MentBrowser";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";


const Search = () => {
  return (
    <Container>
      <NavBar/>
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
