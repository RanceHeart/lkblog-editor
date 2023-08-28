import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from "@mui/system";
import { Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Header from "../components/Header/header";
import { useDispatch, useSelector } from "react-redux";
import { readPost } from "../reducer/posts/postsAction.js";
import ReactHtmlParser from 'react-html-parser';
import './PostView.css';

const PostView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(readPost(id));
  }, [id, dispatch]);

  const post = useSelector(state => state.posts.post);

  if (!post) {
    return <Typography variant="h4">Post not found</Typography>;
  }

  return (
    <Box sx={{ mx: 'auto', px: { xs: 2, sm: 3, md: 6 }, paddingTop: '150px' }}>
      <Box>
        <Header />
      </Box>
      <Container maxWidth="lg">
        <img src={post.image} alt="Post" style={{ width: '100%', objectFit: 'contain' }} />
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
          {post.tags.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" sx={{ mr: 1, mb: 1 }} />
          ))}
          <Typography variant="body2" color="text.secondary">
            <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
            {post.readTime} min read
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 4,

          }}
        >
          <div className='ck-content'>
            {ReactHtmlParser(post.content)}
          </div>
        </Box>
      </Container>
    </Box>
  )
};

export default PostView;
