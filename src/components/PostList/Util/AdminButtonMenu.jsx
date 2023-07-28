import {Box, IconButton, Link} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import HideSourceIcon from '@mui/icons-material/HideSource';
import DeleteIcon from "@mui/icons-material/Delete.js";


import {useState} from "react";
import {Link as RouterLink} from "react-router-dom";

const AdminButtonMenu = (postData) => {

  const [bookmarkColor, setBookmarkColor] = useState('default');
  const [likeColor, setLikeColor] = useState('default');
  const [deleteColor, setDeleteColor] = useState('default');

  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Link component={RouterLink} to={`/post/${postData.id}`} underline="none">
        <IconButton
          aria-label="edit"
          color={bookmarkColor}
          onMouseEnter={() => setBookmarkColor('default')}
          onMouseLeave={() => setBookmarkColor('default')}
          onClick={() => {
            setBookmarkColor('warning')
            history.push({
              pathname: '/edit-post/:' + postData.id,
              state: {mode: 'edit', postData: postData}
            });
          }}
        >
          <EditIcon/>
        </IconButton>
      </Link>

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
