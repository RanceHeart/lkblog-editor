import {Box, Typography, IconButton, Icon, Grid, Link, Chip, Button} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useState} from "react";
import {Link as RouterLink} from 'react-router-dom';
// @ts-ignore
import UserButtonMenu from './Util/UserButtonMenu'
import AdminButtonMenu from './Util/AdminButtonMenu'

export interface PostProps {
  id: string;
  author: string;
  publication: string;
  title: string;
  content: string;
  imageUrl: string;
  tags: string[];
  readTime: number;
}

const Post: React.FC<PostProps> = ({id, author, publication, title, content, imageUrl, tags, readTime}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [postHovered, setPostHovered] = useState(false);
  const [postClicked, setPostClicked] = useState(false);

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
          onMouseDown={() => setPostClicked(true)}
          onMouseUp={() => setPostClicked(false)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Link component={RouterLink} to={`/post/${id}`} color="text.primary" underline="none">
              <Box sx={{width: '100%', height: '300px', overflow: 'hidden'}}>
                <img src={imageUrl} alt="Post" style={{width: '100%', height: 'auto'}}/>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Link component={RouterLink} to={`/post/${id}`} color="text.primary" underline="none">
              <Typography variant="h5">{title}</Typography>
              <Typography variant="body1" color="text.secondary" mt={2}>
                {content}
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
                          fontSize: `${1 - index * 0.15}em` // Decrease font size based on index
                        }}
                    />
                ))}
                <Typography variant="body2" color="text.secondary" sx={{ml: 2, mt: 1}}>
                  <AccessTimeIcon sx={{mr: 1, fontSize: 20}}/>
                  {readTime} min read
                </Typography>
              </Box>
              < AdminButtonMenu/>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Post;
