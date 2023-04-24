import { Button, Card, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSearchParams } from "react-router-dom";

import { getMents } from "../handlers/ments";
import { isLoggedIn } from "../helpers/authHelper";
import CreateMent from "./CreateMent";
import Loading from "./Loading";
import MentCard from "./MentCard";
import SortBySelect from "./SortBySelect";
import HorizontalStack from "./util/HorizontalStack";

const MentBrowser = (props) => {
  const [ments, setMents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [count, setCount] = useState(0);
  const user = isLoggedIn();

  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);

  const searchExists =
    search && search.get("search") && search.get("search").length > 0;

  const fetchMents = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);

    let query = {
      page: newPage,
      sortBy,
    };

    let data;

    if (props.contentType === "ments") {
      if (props.profileUser) query.author = props.profileUser.username;
      if (searchExists) query.search = search.get("search");

      data = await getMents(user && user.token, query);
    }

    if (data.data.length < 10) {
      setEnd(true);
    }

    setLoading(false);
    if (!data.error) {
      setMents([...ments, ...data.data]);
      setCount(data.count);
    }
  };

  useEffect(() => {
    fetchMents();
  }, [sortBy, effect]);

  useEffect(() => {
    setMents([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
  }, [search]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setMents([]);
    setPage(0);
    setEnd(false);
    setSortBy(newSortBy);
  };

  const removeMent = (removedMent) => {
    setMents(ments.filter((ment) => ment._id !== removedMent._id));
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const contentTypeSorts = {
    ments: {
      "-createdAt": "Latest",
      createdAt: "Earliest",
    },
  };

  const sorts = contentTypeSorts[props.contentType];

  return (
    <>
      <Stack spacing={2}>
        <Card>
          <HorizontalStack justifyContent="space-between">
            {props.createMent && <CreateMent />}
            <SortBySelect
              onSortBy={handleSortBy}
              sortBy={sortBy}
              sorts={sorts}
            />
          </HorizontalStack>
        </Card>
        {searchExists && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Showing results for "{search.get("search")}"
            </Typography>
            <Typography color="text.secondary" variant="span">
              {count} results found
            </Typography>
          </Box>
        )}

          {loading && <Loading />}
        <Scrollbars autoHeight autoHeightMin={'780px'} >
          {ments.map((ment, i) => (
            <Box my={2} key={i}>
              <MentCard
                preview="primary"
                key={ment._id}
                ment={ment}
                removeMent={removeMent}
              />
            </Box>
          ))}
        </Scrollbars>

        {end ? (
          <Stack py={5} alignItems="center">
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {ments.length > 0 ? (
                <>All ments have been viewed</>
              ) : (
                <>No ments available</>
              )}
            </Typography>
            <Button variant="text" size="small" onClick={handleBackToTop}>
              Back to top
            </Button>
          </Stack>
        ) : (
          !loading &&
          ments &&
          ments.length > 0 && (
            <Stack pt={2} pb={6} alignItems="center" spacing={2}>
              <Button onClick={fetchMents} variant="contained">
                Load more
              </Button>
              <Button variant="text" size="small" onClick={handleBackToTop}>
                Back to top
              </Button>
            </Stack>
          )
        )}
      </Stack>
    </>
  );
};

export default MentBrowser;
