import {Box, Typography, IconButton, Grid, Link, Chip, Button} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

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

const Post: React.FC<PostProps> = ({author, publication, title, content, imageUrl, tags, readTime}) => {
  const [bookmarkColor, setBookmarkColor] = useState<String>('default');
  const [likeColor, setLikeColor] = useState<String>('default');
  const [deleteColor, setDeleteColor] = useState<String>('default');

  const [isHovered, setIsHovered] = useState(false);

  return (
      <Box sx={{overflow: 'hidden', my: 6}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{width: '100%', height: '300px', overflow: 'hidden'}}>
              <img src={imageUrl} alt="Post" style={{width: '100%', height: 'auto'}}/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Link href="#" color="text.primary" underline="hover">
              <Typography variant="h5">{title}</Typography>
            </Link>
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
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
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
  );
};

export default Post;
