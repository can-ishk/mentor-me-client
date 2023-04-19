import { Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { getMents } from "../handlers/ments";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "./Loading";
import MentCard from "./MentCard";
import HorizontalStack from "./util/HorizontalStack";

const TopMents = () => {
  const [loading, setLoading] = useState(true);
  const [ments, setMents] = useState(null);
  const user = isLoggedIn();

  const fetchMents = async () => {
    const query = { sortBy: "-likeCount" };

    const data = await getMents(user && user.token, query);

    const topMents = [];

    if (data && data.data) {
      for (let i = 0; i < 3 && i < data.data.length; i++) {
        topMents.push(data.data[i]);
      }
    }

    setMents(topMents);

    setLoading(false);
  };

  useEffect(() => {
    fetchMents();
  }, []);

  return (
    <Stack spacing={2}>
      <Card>
        <HorizontalStack>
          <MdLeaderboard />
          <Typography>Top Ments</Typography>
        </HorizontalStack>
      </Card>
      {!loading ? (
        ments &&
        ments.map((ment) => (
          <MentCard preview="secondary" ment={ment} key={ment._id} />
        ))
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default TopMents;
