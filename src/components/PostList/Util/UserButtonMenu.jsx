import {Box, IconButton} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark.js";
import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import {useState} from "react";

const UserButtonMenu =(postId) => {
  const [bookmarkColor, setBookmarkColor] = useState ('default');
  const [likeColor, setLikeColor] = useState  ('default');

  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <IconButton
        aria-label="mark"
        color={bookmarkColor}
        onMouseEnter={() => setBookmarkColor('default')}
        onMouseLeave={() => setBookmarkColor('default')}
        onClick={() => setBookmarkColor('warning')}
      >
        <BookmarkIcon/>
      </IconButton>

      <IconButton
        aria-label="like"
        color={likeColor}
        onMouseEnter={() => setLikeColor('default')}
        onMouseLeave={() => setLikeColor('default')}
        onClick={() => setLikeColor('info')}
      >
        <ThumbUpIcon/>
      </IconButton>
    </Box>
  );
}

export default UserButtonMenu;
