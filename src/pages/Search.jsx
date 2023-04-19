import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {Scrollbars} from 'react-custom-scrollbars-2'

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
