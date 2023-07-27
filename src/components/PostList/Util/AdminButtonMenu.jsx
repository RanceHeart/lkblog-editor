import {Box, IconButton} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import HideSourceIcon from '@mui/icons-material/HideSource';
import DeleteIcon from "@mui/icons-material/Delete.js";


import {useState} from "react";

const AdminButtonMenu =() => {
  const [bookmarkColor, setBookmarkColor] = useState ('default');
  const [likeColor, setLikeColor] = useState  ('default');
  const [deleteColor, setDeleteColor] = useState  ('default');

  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <IconButton
        aria-label="edit"
        color={bookmarkColor}
        onMouseEnter={() => setBookmarkColor('default')}
        onMouseLeave={() => setBookmarkColor('default')}
        onClick={() => setBookmarkColor('warning')}
      >
        <EditIcon/>
      </IconButton>

      <IconButton
        aria-label="hide"
        color={likeColor}
        onMouseEnter={() => setLikeColor('default')}
        onMouseLeave={() => setLikeColor('default')}
        onClick={() => setLikeColor('info')}
      >
        <HideSourceIcon/>
      </IconButton>

      <IconButton
        aria-label="delete"
        color={deleteColor}
        onMouseEnter={() => setDeleteColor('default')}
        onMouseLeave={() => setDeleteColor('default')}
        onClick={() => setDeleteColor('error')}
      >
        <DeleteIcon/>
      </IconButton>
    </Box>
  );
}

export default AdminButtonMenu;
