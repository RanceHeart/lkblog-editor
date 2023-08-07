import {Container, useMediaQuery} from '@mui/material';
import Post from './Post';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Fuse from 'fuse.js';

import {fetchPosts} from "../../reducer/posts/postsAction.js"
import {useTheme} from "@mui/styles";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts.posts) || [];  // Get the posts from the Redux store
  const filterKeyword = useSelector((state: any) => state.posts.filterKeyword) || '';  // Get the filter keyword from the Redux store

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPosts());  // Dispatch the fetchPosts action when the component mounts
  }, [dispatch]);

// Fuse.js options
  const options = {
    includeScore: true,
    keys: ['title']
  };

  let filteredPosts = posts;

  if (filterKeyword) {
    const fuse = new Fuse(posts, options);
    const result = fuse.search(filterKeyword);

    // Extract the matched posts
    filteredPosts = result.map(({item}) => item);
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Container maxWidth={isSmallScreen ? 'sm' : 'md'}>
        {filteredPosts.map((post, index) => (
            <Post key={index} {...post} sx={{my: 4}}/>
        ))}
      </Container>
  );
};

export default PostList;
