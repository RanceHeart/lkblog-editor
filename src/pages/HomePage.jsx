import { Box, Grid } from '@mui/material';
import Header from '../components/Header/header';
import PostList from '../components/PostList/postList';
import Profile from '../components/Profile/profile';
import RecentPosts from '../components/RecentPosts/recentPosts';

// Initial value
const recentPosts = [
  {title: "Post 1"},
  {title: "Post 2"},
  {title: "Post 3"},
  // Add more posts as needed
];

const posts = [
  {
    id: '1',
    author: 'Author 1',
    publication: 'Publication 1',
    title: 'Title 1',
    content: 'Content 1',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    author: 'Author 2',
    publication: 'Publication 2',
    title: 'Title 2',
    content: 'Content 2',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    author: 'Author 3',
    publication: 'Publication 3',
    title: 'Title 3',
    content: 'Content 3',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '4',
    author: 'Author 4',
    publication: 'Publication 4',
    title: 'Title 4',
    content: 'Content 4',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '5',
    author: 'Author 5',
    publication: 'Publication 5',
    title: 'Title 5',
    content: 'Content 5',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '6',
    author: 'Author 6',
    publication: 'Publication 6',
    title: 'Title 6',
    content: 'Content 6',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: '7',
    author: 'Author 7',
    publication: 'Publication 7',
    title: 'Title 7',
    content: 'Content 7',
    imageUrl: 'https://via.placeholder.com/150'
  },
  // Add more posts as needed
];

function HomePage() {

  return (
    <Box sx={{ mx: 'auto', px: 6 }}>
      <Box>
        <Header />
      </Box>
      <Box sx={{ maxWidth: '1450px', mx: 'auto', px: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ overflowY: 'auto', pr: 8, maxHeight: 'calc(90vh - 100px)', scrollbarWidth: 'none' }}>
              <PostList posts={posts} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: ['static', 'sticky'], top: '0', p: 3 }}>
              <Profile />
              <RecentPosts posts={recentPosts} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
