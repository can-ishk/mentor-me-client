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
import Chip from '@mui/material/Chip';
import options from "../data/options.js";
import MultiSelectChip from "./util/MultiSelectChips.jsx";

export default function ProfileCard(props) {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
      props.setSelected(props.profile.user.tags)
      // //console.log(props.profile.user)
      // user.tags && //console.log(user.tags)
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

              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
                tags={<MultiSelectChip
                  label="Which skills do you bring to the table?"
                  items={options}
                  getter={props.selected}
                  setter={props.setSelected}
                />}
              />

            </Box>
          ) : user.biography ? (
            <Typography textAlign="center" variant="p">
              {/* <b>Bio: </b> */}
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
              !props.editing ? (
                (user.tags && user.tags[0]) ?
                  (
                    <Box display={'flex'} flexWrap={'wrap'} padding={'auto'} justifyContent={'center'} >
                    {user.tags.map((tag, i) => {
                      return (
                        <Chip key={i} label={tag} sx={{margin:0.5}}/>
                      )
                    })}
                    </Box>
                  )
                  :
                  (<Typography variant="p">
                    <i>No tags yet</i>
                  </Typography>)
              ) : ""
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

