import {Box, IconButton, Link} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import HideSourceIcon from '@mui/icons-material/HideSource';
import DeleteIcon from "@mui/icons-material/Delete";

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {deletePost} from "../../../reducer/actions.js";
import {useDispatch} from "react-redux"; // Import useNavigate

const AdminButtonMenu = ({postId}) => {
    const dispatch = useDispatch();

    const [bookmarkColor, setBookmarkColor] = useState('default');
    const [likeColor, setLikeColor] = useState('default');
    const [deleteColor, setDeleteColor] = useState('default');

    const navigate = useNavigate(); // Get access to the navigate function

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton
                aria-label="edit"
                color={bookmarkColor}
                onMouseEnter={() => setBookmarkColor('default')}
                onMouseLeave={() => setBookmarkColor('default')}
                onClick={() => {
                    setBookmarkColor('warning')
                    navigate(`/edit-post/${postId}`, {state: {mode: 'edit', postId: postId}});
                }}
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
                onClick={() => {
                    dispatch(deletePost(postId));
                    setDeleteColor('error')
                }}
            >
                <DeleteIcon/>
            </IconButton>
        </Box>
    );
}

export default AdminButtonMenu;
