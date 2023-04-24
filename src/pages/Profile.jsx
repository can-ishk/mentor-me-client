import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../handlers/users";
import { isLoggedIn } from "../helpers/authHelper";

import ErrorAlert from "../components/ErrorAlert";
import FindUsers from "../components/FindUsers";
import Footer from "../components/Footer";
import GridLayout from "../components/GridLayout";
import Loading from "../components/Loading";
import MentBrowser from "../components/MentBrowser";
import MobileProfile from "../components/MobileProfile";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard";
import ProfileTabs from "../components/ProfileTabs";

const ProfileView = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState();

  const [tab, setTab] = useState("ments");
  const user = isLoggedIn();
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    const data = await getUser(params);
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setProfile(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const tags = selected;
    //console.log("submittin", content)
    //console.log(profile.user)
    // if(!Array.isArray(content)){
    //   await updateUser(user, { biography: content }) 
    //   setProfile({ ...profile, user: { ...profile.user, biography: content } });
    // }
    if (content !== user.content || tags !== user.tags) {
      await updateUser(user, { biography: content, tags: tags })
      setProfile({ ...profile, user: { ...profile.user, biography: content, tags: tags } });
    }
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleMessage = () => {
    navigate("/chat", { state: { user: profile.user } });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const validate = (content) => {
    let error = "";

    if (content.length > 250) {
      error = "Bio cannot be longer than 250 characters";
    }

    return error;
  };

  let tabs;
  if (profile) {
    tabs = {
      ments: (
        <MentBrowser
          profileUser={profile.user}
          contentType="ments"
          key="ments"
        />
      )
    };
  }

  return (
    <Container >
      <NavBar />

      <GridLayout
        left={
          <>
            <MobileProfile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
            />
            <Stack spacing={2}>
              {profile ? (
                <>
                  <ProfileTabs tab={tab} setTab={setTab} />

                  {tabs[tab]}
                </>
              ) : (
                <Loading />
              )}
              {error && <ErrorAlert error={error} />}
            </Stack>
          </>
        }
        right={
          <Stack spacing={2}>
            <ProfileCard
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
              setSelected={setSelected}
              selected={selected}
            />

            <FindUsers />
            <Footer />
          </Stack>
        }
      />
    </Container>
  );
};

export default ProfileView;
