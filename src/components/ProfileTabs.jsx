import { Card, Tab, Tabs } from "@mui/material";
import React from "react";

export default function ProfileTabs(props){
  const handleChange = (e, newValue) => {
    props.setTab(newValue);
  };

  return (
    <Card sx={{ padding: 0 }}>
      <Tabs value={props.tab} onChange={handleChange} variant="scrollable">
        <Tab label="ments" value="ments" />
      </Tabs>
    </Card>
  );
};