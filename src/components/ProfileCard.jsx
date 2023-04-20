import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import Avatar from "./Avatar";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Loading from "./Loading";
import HorizontalStack from "./util/HorizontalStack";
import TagUpdateProfile from "./TagUpdateProfile";
import Chip from '@mui/material/Chip';

export default function ProfileCard(props) {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
      console.log(props.profile.user)
      // user.tags && console.log(user.tags)
    }
  }, [props.profile]);

  return (
    <Card>
      {user ? (
        <Stack alignItems="center" spacing={2}>
          <Box my={1}>
            <Avatar width={150} height={150} username={user.username} />
          </Box>

          <Typography variant="h5">{user.username}</Typography>

          {props.editing ? (
            <Box>
              <TagUpdateProfile handleSubmit={props.handleSubmit} />
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />

            </Box>
          ) : user.biography ? (
            <Typography textAlign="center" variant="p">
              <b>Bio: </b>
              {user.biography}
            </Typography>
          ) : (
            <Typography variant="p">
              <i>No bio yet</i>
            </Typography>
          )
          
          }
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>

          {
            (user.tags && user.tags.length>0)?
            ( 
              user.tags.map((tag) => {
                console.log(user.tags)
              return(
                <Chip key={tag} label={tag} />
            )}))
            
            :
            (<Typography variant="p">
              <i>No tags yet</i>
            </Typography>)
          }
          </Box>
          {currentUser && user._id === currentUser.userId && (
            <Box>
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                onClick={props.handleEditing}
                >
                {props.editing ? <>Cancel</> : <>Edit bio</>}
              </Button>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button variant="outlined" onClick={props.handleMessage}>
              Message
            </Button>
          )}

          <HorizontalStack>
            {/* <Typography color="text.secondary">
              Coins <b>{props.profile.ments.}</b>
            </Typography> */}
            <Typography color="text.secondary">
              Ments <b>{props.profile.ments.count}</b>
            </Typography>
          </HorizontalStack>
        </Stack>
      ) : (
        <Loading label="Loading profile" />
      )}
    </Card>
  );
};

