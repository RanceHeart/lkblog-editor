import { useEffect, useState } from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
import {Box} from "@mui/system";
import {Chip, Grid, Link, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Header from "../components/Header/header";
import {useDispatch, useSelector} from "react-redux";
import {readPost} from "../reducer/posts/postsAction.js";
import ReactHtmlParser from 'react-html-parser';

const PostView = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  // Fetch the post's data based on the ID in the URL.
  useEffect(() => {
    dispatch(readPost(id));
  }, [id, dispatch]);

  // Get the post data from the Redux store
  const post = useSelector(state => state.posts.post);

  if (!post) {
    return <Typography variant="h4">Post not found</Typography>;
  }

  return (
    <Box sx={{mx: 'auto', px: 6, paddingTop: '150px'}}>
      <Box>
        <Header/>
      </Box>
      <Box sx={{ maxWidth: '800px', mx: 'auto', px: 6 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {post.tags.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" sx={{ mr: 1 }} />
          ))}
          <Typography variant="body2" color="text.secondary">
            <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
            {post.readTime} min read
          </Typography>
        </Box>
        <Box sx={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
          <img src={post.image} alt="Post" style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">
            {ReactHtmlParser(post.content)}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
};

export default PostView;
