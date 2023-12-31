import {Box, Typography, List, ListItem, Link, Grid, useTheme, useMediaQuery} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagSelection from '../TagSelection/TagSelection';
import {Link as RouterLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPosts} from "../../reducer/posts/postsAction.js"

const RecentPosts: React.FC = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: any) => state.posts.posts) || [];

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  console.log(allPosts)
  const filteredPosts = selectedTag
      ? allPosts.filter(post => post.tags.includes(selectedTag))
      : allPosts;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPosts());  // Dispatch the fetchPosts action when the component mounts
  }, [dispatch]);

  return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" mb={1}>
            Tag Selection
          </Typography>
          <TagSelection onTagClick={setSelectedTag} />
        </Grid>
        {isSmallScreen ? <div/> : <Grid item xs={12}>
          <Box sx={{p: 2}}>
            <Typography variant="h6" mb={1}>
              Recent Posts
            </Typography>
            <List>
              {filteredPosts.slice(0, 3).reverse().map((post) => (
                  <ListItem key={post.id} sx={{mb: 0.5}}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Link component={RouterLink} to={`/posts/${post.id}`} color="text.primary" underline="hover">
                          <Typography variant="subtitle1">{post.title}</Typography>
                        </Link>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          in Blog
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={9}>
                        <Typography variant="caption" color="text.secondary">
                          <AccessTimeIcon sx={{fontSize: 14, verticalAlign: 'middle', mr: 0.5}}/>
                          {post.readTime} min read
                        </Typography>
                      </Grid>

                    </Grid>
                  </ListItem>
              ))}
            </List>
          </Box>
        </Grid>}
      </Grid>
  );
};

export default RecentPosts;
