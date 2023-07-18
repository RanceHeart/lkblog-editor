import { Box, Typography, List, ListItem, Link } from '@mui/material';

type Post = {
  title: string;
};

type RecentPostsProps = {
  posts: Post[];
};

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h5" mb={2}>
        Recent Posts
      </Typography>
      <List>
        {posts.map((post, index) => (
          <ListItem key={index}>
            <Link href="#">{post.title}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentPosts;
