import { Typography } from "@mui/material";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import HorizontalStack from "./util/HorizontalStack";

const ContentDetails = ({ username, type, createdAt, edited, preview }) => {
  return (
    <HorizontalStack sx={{}}>
      <Avatar width={30} height={30} username={username} />
      <Typography variant="subtitle2" gutterBottom>
        <Link
          underline="hover"
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={username==="deleted"?"/":"/users/" + username}
        >
          <Typography display={'inline'} color={'primary'}>

          {username}
          </Typography>
        </Link>
        {type && (" is "+ type)}
        {!preview && (
          <>
            {" "}
            · <Moment fromNow>{createdAt}</Moment> {edited && <>(Edited)</>}
          </>
        )}
      </Typography>
    </HorizontalStack>
  );
};

export default ContentDetails;
