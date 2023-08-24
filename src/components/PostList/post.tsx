import {Box, Chip, Grid, Link, Typography, useMediaQuery} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useState} from "react";
import {Link as RouterLink} from 'react-router-dom';
import AdminButtonMenu from './Util/AdminButtonMenu'
import UserButtonMenu from './Util/UserButtonMenu'
import {useSelector} from "react-redux";
import ReactHtmlParser from 'react-html-parser';
// @ts-ignore
import React from 'react';
import {useTheme} from "@mui/styles";

export interface PostProps {
  id: string;
  title: string;
  image: string;
  tags: string[];
  content: string;
  readTime: number;
}

interface RootState {
  user: {
    userData: any; // replace 'any' with the actual type of your user data
  };
  // other state properties...
}

function transformCloudinaryUrl(url, width = 300, height = 400) {
  const parts = url.split('/');
  const indexToInsert = parts.findIndex(part => part.startsWith('v1'));
  parts.splice(indexToInsert, 0, `c_fill,h_${height},w_${width}`);
  return parts.join('/');
}


const Post = React.memo(({id, title, content, image, tags, readTime}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [postHovered, setPostHovered] = useState(false);

  const userData = useSelector((state: RootState) => state.user.userData);

  const theme = useTheme();
  // @ts-ignore
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Box
          sx={{
            overflow: 'hidden',
            my: 6,
            cursor: 'pointer',
            boxShadow: postHovered ? 3 : 1,
            transform: postHovered ? 'scale(1.02)' : 'scale(1)',
            padding: 2,
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={() => {
            setPostHovered(true);
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setPostHovered(false);
            setIsHovered(false);
          }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={isSmallScreen ? 12 : 4}>
            <Link component={RouterLink} to={`/posts/${id}`} color="text.primary" underline="none">
              <Box sx={{width: '100%', height: isSmallScreen ? '200px' : '300px', overflow: 'hidden'}}>
                <img src={transformCloudinaryUrl(image)} alt="Post" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} md={isSmallScreen ? 12 : 8}>
            <Link component={RouterLink} to={`/posts/${id}`} color="text.primary" underline="none">
              <Typography variant={isSmallScreen ? 'h6' : 'h5'}>{title}</Typography>
              <Typography variant="body1" color="text.secondary" mt={2}>
                {ReactHtmlParser(content.length > 350 ? content.substring(0, 350) + '...' : content)}
              </Typography>
            </Link>
            <Box sx={{mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
              >
                {tags.slice(0, isHovered ? tags.length : 1).map((tag, index) => (
                    <Chip
                        label={tag}
                        key={index}
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 1,
                          mt: 1,
                          fontSize: `${1}em` // Decrease font size based on index
                        }}
                    />
                ))}
                <Typography variant="body2" color="text.secondary" sx={{ml: 2, mt: 1}}>
                  <AccessTimeIcon sx={{mr: 1, fontSize: 20}}/>
                  {readTime} min read
                </Typography>
              </Box>
              {userData === true ? <AdminButtonMenu postId={id}/> : <UserButtonMenu postId={id} />}
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
});

export default Post;
