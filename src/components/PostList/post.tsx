import {Box, Typography, IconButton, Icon, Grid, Link, Chip, Button} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import { Link as RouterLink } from 'react-router-dom';

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
type ButtonColor = 'default' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

const Post: React.FC<PostProps> = ({id, author, publication, title, content, imageUrl, tags, readTime}) => {
  const [bookmarkColor, setBookmarkColor] = useState<ButtonColor>('default');
  const [likeColor, setLikeColor] = useState<ButtonColor>('default');
  const [deleteColor, setDeleteColor] = useState<ButtonColor>('default');

  const [isHovered, setIsHovered] = useState(false);
  const [postHovered, setPostHovered] = useState(false);
  const [postClicked, setPostClicked] = useState(false);

  return (
      <Link component={RouterLink} to={`/post/${id}`} color="text.primary" underline="none">
        <Box
            sx={{overflow: 'hidden', my: 6, cursor: 'pointer', boxShadow: postHovered ? 3 : 1, transform: postHovered ? 'scale(1.02)' : 'scale(1)', padding: 2, transition: 'transform 0.3s ease'}}
            onMouseEnter={() => {setPostHovered(true); setIsHovered(true);}}
            onMouseLeave={() => {setPostHovered(false); setIsHovered(false);}}
            onMouseDown={() => setPostClicked(true)}
            onMouseUp={() => setPostClicked(false)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{width: '100%', height: '300px', overflow: 'hidden'}}>
                <img src={imageUrl} alt="Post" style={{width: '100%', height: 'auto'}}/>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5">{title}</Typography>
              <Typography variant="body1" color="text.secondary" mt={2}>
                {content}
              </Typography>
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
                      <Chip label={tag} key={index} variant="outlined" size="small" sx={{mr: 1, mt: 1}}/>
                  ))}
                  <Typography variant="body2" color="text.secondary" sx={{ml: 2, mt: 1}}>
                    <AccessTimeIcon sx={{mr: 1, fontSize: 20}}/>
                    {readTime} min read
                  </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <IconButton
                      aria-label="mark"
                      color={bookmarkColor}
                      onMouseEnter={() => setBookmarkColor('default')}
                      onMouseLeave={() => setBookmarkColor('default')}
                      onClick={() => setBookmarkColor('warning')}
                  >
                    <BookmarkIcon/>
                  </IconButton>

                  <IconButton
                      aria-label="like"
                      color={likeColor}
                      onMouseEnter={() => setLikeColor('default')}
                      onMouseLeave={() => setLikeColor('default')}
                      onClick={() => setLikeColor('info')}
                  >
                    <ThumbUpIcon/>
                  </IconButton>

                  <IconButton
                      aria-label="delete"
                      color={deleteColor}
                      onMouseEnter={() => setDeleteColor('default')}
                      onMouseLeave={() => setDeleteColor('default')}
                      onClick={() => setDeleteColor('error')}
                  >
                    <DeleteIcon/>
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
  );
};

export default Post;
