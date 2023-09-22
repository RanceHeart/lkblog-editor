// MusicPlayer.tsx
import { FC } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import {VideoContainer} from '../components/VideoBackground/VideoContainer';
import Header from "../components/Header/header";
import RightPanel from "../components/MusicPanel/RightPanel";

const MusicPlayer: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <div>
        <VideoContainer />
        <Header />
        <RightPanel />
      </div>
  );
};

export default MusicPlayer;
