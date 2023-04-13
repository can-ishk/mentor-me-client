import { Container } from "@mui/material";
import React from "react";
import GoBack from "../components/GoBack";
import GridLayout from "../components/GridLayout";
import NavBar from "../components/NavBar";
import MentEditor from "../components/MentEditor";
import Sidebar from "../components/Sidebar";

const CreateMentView = () => {
  return (
    <Container>
      <NavBar />
      <GoBack />
      <GridLayout left={<MentEditor />} right={<Sidebar />} />
    </Container>
  );
};

export default CreateMentView;
