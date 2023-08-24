import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import Header from '../components/Header/header';
import PostList from '../components/PostList/postList';
import TagSelection from '../components/RecentPosts/RecentPosts';

function Posts() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mx: 'auto', px: isSmallScreen ? 2 : 6, paddingTop: isSmallScreen ? '180px' : '150px'}}>
      <Box>
        <Header />
      </Box>
      <Box sx={{ mx: 'auto', px: isSmallScreen ? 2 : 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ overflowY: 'auto', pr: isSmallScreen ? 0 : 8, maxHeight: 'calc(90vh - 100px)', scrollbarWidth: 'none' }}>
              <PostList />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: isSmallScreen ? 'static' : 'sticky', top: '0', p: 3 }}>
              <TagSelection />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Posts;
