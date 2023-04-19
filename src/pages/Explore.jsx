import { Button, Card, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getMents } from "../handlers/ments";
import { isLoggedIn } from "../helpers/authHelper";
import CreateMent from "../components/CreateMent";
import GridLayout from "../components/GridLayout";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import SortBySelect from "../components/SortBySelect";
import MentCard from "../components/MentCard";
import Sidebar from "../components/Sidebar";
import HorizontalStack from "../components/util/HorizontalStack";
import MentBrowser from "../components/MentBrowser";
import { Scrollbars } from 'react-custom-scrollbars-2';

const ExploreView = () => {
  return (
    <Container>
      <NavBar />
      <GridLayout
        left={
          <Scrollbars >
        <MentBrowser createMent contentType="ments" />
          </Scrollbars>
      }
        right={<Sidebar />}
      />
    </Container>
  );
};

export default ExploreView;
