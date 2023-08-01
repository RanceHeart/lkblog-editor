import { Container } from '@mui/material';
import Post from './Post';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {fetchPosts} from "../../reducer/posts/postsAction.js"

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state:any) => state.posts.posts) || [];  // Get the posts from the Redux store

  useEffect(() => {
    // @ts-ignore
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
