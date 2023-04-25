import { Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { getMent, getMents } from "../handlers/ments";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "./Loading";
import MentCard from "./MentCard";
import HorizontalStack from "./util/HorizontalStack";

const TopMents = () => {
  const [loading, setLoading] = useState(true);
  const [ments, setMents] = useState(null);
  const user = isLoggedIn();

  const fetchMents = async () => {
    const query = { sortBy: {"-createdAt":1} };

    // const data = await getMents(user && user.token, query);
    const data = await getMents(user && user.token, query);

    var topMents = [];

    if (data && data.data) {
      console.log(data.data)
      for (let i = 0; i < 2 && i < data.data.length; i++) {
        if(data.data[i]._id!=="64479b4fa71d4ac7bd605503"){
          topMents.push(data.data[i]);
        }
      }
    }
    const fixedMent = await getMent("64479b4fa71d4ac7bd605503", user&&user.token)
    topMents = [fixedMent, ...topMents]
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
          <MentCard showTags={false} preview="secondary" ment={ment} key={ment._id} />
        ))
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default TopMents;
