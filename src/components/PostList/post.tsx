import { Box, Typography, Avatar, Grid, Link } from '@mui/material';

export interface PostProps {
  id: string;
  author: string;
  publication: string;
  title: string;
  content: string;
  imageUrl: string;
}

const Post: React.FC<PostProps> = ({ author, publication, title, content }) => {
  return (
    <Box sx={{ overflow: 'hidden', my: 6 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar src="https://via.placeholder.com/150" alt="Author" />
        </Grid>
        <Grid item>
          <Link href="#" color="text.primary" underline="hover">
            {author}
          </Link>
          <Typography variant="body2" color="text.secondary">
            in{' '}
            <Link href="#" color="text.primary" underline="hover">
              {publication}
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ p: 6 }}>
        <Link href="#" color="text.primary" underline="hover">
          <Typography variant="h5">{title}</Typography>
        </Link>
        <Typography variant="body1" color="text.secondary" mt={2}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default Post;
