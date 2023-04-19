import {
  Card,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillEdit, AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deleteMent, updateMent } from "../handlers/ments";
import { isLoggedIn, logOutUser } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";

import MentContentBox from "./MentContentBox";
import HorizontalStack from "./util/HorizontalStack";

import { } from "react-icons/ai";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";

import "./mentCard.css";
import { MdCancel } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { dishonourableLogout } from "../helpers/dishonourableLogoutHelper";

export default function MentCard(props) {
  const { preview, removeMent } = props;
  let mentData = props.ment;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === mentData.author.username;

  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [ment, setMent] = useState(mentData);

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }

  const handleDeleteMent = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      const data = await deleteMent(ment._id, isLoggedIn());
      if(data && data.error){
        dishonourableLogout( {navigate}, data.errorName, data.error );
      }
      setLoading(false);
      if (preview) {
        removeMent(ment);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditMent = async (e) => {
    e.stopPropagation();

    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    const data = await updateMent(ment._id, isLoggedIn(), { content });
    if (data && data.error) {
      dishonourableLogout( {navigate}, data.errorName, data.error );
    }
    setMent({ ...ment, content, edited: true });
    setEditing(false);
  };

  return (
    <Card sx={{ padding: 0 }} className="ment-card">
      <Box className={preview} >
        <HorizontalStack spacing={0} alignItems="initial" >
          <MentContentBox clickable={preview} ment={ment} editing={editing}>
            <HorizontalStack justifyContent="space-between" >
              <ContentDetails
                username={ment.author.username}
                createdAt={ment.createdAt}
                edited={ment.edited}
                preview={preview === "secondary"}
              />
              <Box>
                {user && (isAuthor || user.isAdmin) && preview !== "secondary" && (
                  <HorizontalStack>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleEditMent}
                    >
                      {editing ? (
                        <MdCancel color={iconColor} />
                      ) : (
                        <AiFillEdit color={iconColor} />
                      )}
                    </IconButton>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleDeleteMent}
                    >
                      {confirm ? (
                        <AiFillCheckCircle color={theme.palette.error.main} />
                      ) : (
                        <BiTrash color={theme.palette.error.main} />
                      )}
                    </IconButton>
                  </HorizontalStack>
                )}
              </Box>
            </HorizontalStack>

            <Typography
              variant="h5"
              gutterBottom
              sx={{ overflow: "hidden", mt: 1, maxHeight: 125 }}
              className="title"
            >
              {ment.title}
            </Typography>

            {preview !== "secondary" &&
              (editing ? (
                <ContentUpdateEditor
                  handleSubmit={handleSubmit}
                  originalContent={ment.content}
                />
              ) : (
                <Box
                  maxHeight={maxHeight}
                  overflow="hidden"
                  className="content"
                >
                  <Markdown content={ment.content} />
                </Box>
              ))}
          </MentContentBox>
        </HorizontalStack>
      </Box>
    </Card>
  );
};