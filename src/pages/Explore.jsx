import { Container } from "@mui/material";
import React from "react";
import GridLayout from "../components/GridLayout";
import MentBrowser from "../components/MentBrowser";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const ExploreView = () => {
  return (
    <Container>
      <NavBar />
      <GridLayout
        left={
        <MentBrowser createMent contentType="ments" />
      }
        right={<Sidebar />}
      />
    </Container>
  );
};

export default ExploreView;
