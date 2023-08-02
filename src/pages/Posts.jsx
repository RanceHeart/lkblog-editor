import { Box, Grid } from '@mui/material';
import Header from '../components/Header/header';
import PostList from '../components/PostList/postList';
import RecentPosts from '../components/RecentPosts/recentPosts';


function Posts() {

  return (
    <Box sx={{ mx: 'auto', px: 6, paddingTop: '150px'}}>
      <Box>
        <Header />
      </Box>
      <Box sx={{ maxWidth: '1450px', mx: 'auto', px: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ overflowY: 'auto', pr: 8, maxHeight: 'calc(90vh - 100px)', scrollbarWidth: 'none' }}>
              <PostList />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: ['static', 'sticky'], top: '0', p: 3 }}>
              <RecentPosts />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Posts;
