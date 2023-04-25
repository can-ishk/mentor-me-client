import {
  Card,
  Chip,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deleteMent, updateMent } from "../handlers/ments";
import { isLoggedIn } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";

import MentContentBox from "./MentContentBox";
import HorizontalStack from "./util/HorizontalStack";

import { } from "react-icons/ai";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";

import { BiTrash } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { dishonourableLogout } from "../helpers/dishonourableLogoutHelper";
import "./mentCard.css";
import MarkdownEditor from "./MarkdownEditor";

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
}

MentCard.defaultProps ={
  showTags: true,
}

export default function MentCard(props) {
  const { preview, removeMent } = props;
  let mentData = props.ment;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = mentData.author ? (user && user.username === mentData.author.username) : false;
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [ment, setMent] = useState(mentData);
  const tags = ment.tags ? ment.tags : [];
  const projectTags = ment.tags ? ment.projectTags : [];
  const allTags = arrayUnique([...tags, ...projectTags]);
  
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
      if (data && data.error) {
        dishonourableLogout({ navigate }, data.errorName, data.error);
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
    if (content===ment.content){
      setEditing(false);
      return;
    }
    const data = await updateMent(ment._id, isLoggedIn(), { content });
    if (data && data.error) {
      dishonourableLogout({ navigate }, data.errorName, data.error);
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
                username={ment.author ? ment.author.username : "deleted"}
                type={ment.type}
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
            <Box display={isMobile ? 'none' : 'flex'} justifyContent={'flex-start'} marginBottom={1} >
              {props.showTags && allTags && allTags.length > 0 && allTags.map((tag, i) => (
                <Chip label={tag} sx={{ mr: 1 }} key={i} />
              ))}
              {/* {ment.projectTags && ment.projectTags.map((tag, i) => (
                <Chip label={tag} sx={{ mr: 1 }} key={i} />
              ))} */}
            </Box>
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