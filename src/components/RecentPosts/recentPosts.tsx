import { Box, Typography, List, ListItem, Link, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Profile from '../Profile/profile';
import {Link as RouterLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPosts} from "../../reducer/actions"

const RecentPosts: React.FC = ( ) => {
    const dispatch = useDispatch();
    const posts = useSelector((state:any) => state.posts.posts.slice(0,3)) || [];  // Get the posts from the Redux store

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPosts());  // Dispatch the fetchPosts action when the component mounts
    }, [dispatch]);


  return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Profile/>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" mb={1}>
              Recent Posts
            </Typography>
            <List>
              {posts.map((post) => (
                  <ListItem key={post.id} sx={{ mb: 0.5 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Link component={RouterLink} to={`/posts/${post.id}`} color="text.primary" underline="hover">
                          <Typography variant="subtitle1">{post.title}</Typography>
                        </Link>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">
                          in Blog
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary">
                          <AccessTimeIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                          {post.readTime} min read
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
  );
};

export default RecentPosts;
