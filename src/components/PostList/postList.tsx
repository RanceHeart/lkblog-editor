import { Container } from '@mui/material';
import Post, { PostProps } from './Post';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {fetchPosts} from "../../reducer/actions"

interface PostListProps {
  posts: PostProps[];
}

const PostList: React.FC<PostListProps> = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state:any) => state.post.posts) || [];  // Get the posts from the Redux store

  useEffect(() => {
    dispatch(fetchPosts());  // Dispatch the fetchPosts action when the component mounts
  }, [dispatch]);
  return (
      <Container maxWidth="md">
        {posts.map((post, index) => (
            <Post key={index} {...post} sx={{ my: 4 }} />
        ))}
      </Container>
  );
};

export default PostList;
