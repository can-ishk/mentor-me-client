import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import GridLayout from "../components/GridLayout";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import MentCard from "../components/MentCard";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { getMent } from "../handlers/ments";
import ErrorAlert from "../components/ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";

const Ment = () => {
  const params = useParams();

  const [ment, setMent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  const fetchMent = async () => {
    setLoading(true);
    const data = await getMent(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setMent(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMent();
  }, [params.id]);

  return (
    <Container>
      <NavBar />
      <GoBack />
      <GridLayout
        left={
          loading ? (
            <Loading />
          ) : ment ? (
            <Stack spacing={2}>
              <MentCard ment={ment} key={ment._id} />
            </Stack>
          ) : (
            error && <ErrorAlert error={error} />
          )
        }
        right={<Sidebar />}
      />
    </Container>
  );
};

export default Ment;
