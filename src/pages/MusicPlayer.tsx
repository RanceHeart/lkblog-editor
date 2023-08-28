// MusicPlayer.tsx
import { FC } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {VideoBackground} from '../components/VideoBackground/VideoBackground';

const MusicPlayer: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <div>
        <VideoBackground />
        <Box sx={{ mx: 'auto', px: isSmallScreen ? 2 : 6, paddingTop: isSmallScreen ? '80px' : '150px' }}>
          <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
            <IconButton color="primary">
              <PlayArrowIcon />
            </IconButton>
            <IconButton color="primary">
              <StopIcon />
            </IconButton>
            <IconButton color="primary">
              <SkipNextIcon />
            </IconButton>
          </Box>
        </Box>
      </div>
  );
};

export default MusicPlayer;
