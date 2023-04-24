import { Container, Stack } from "@mui/material";
import React from "react";

import GridLayout from "../components/GridLayout";
import MentBrowser from "../components/MentBrowser";
import Sidebar from "../components/Sidebar";


const Search = () => {
  return (
    <Container>
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
