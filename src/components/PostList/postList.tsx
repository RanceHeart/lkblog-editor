import { Container } from '@mui/material';
import Post, { PostProps } from './Post';

interface PostListProps {
  posts: PostProps[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
      <Container maxWidth="md">
        {posts.map((post, index) => (
            <Post key={index} {...post} sx={{ my: 4 }} />
        ))}
      </Container>
  );
};

export default PostList;
