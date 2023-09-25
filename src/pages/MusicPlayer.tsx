import { FC } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import {VideoContainer} from '../components/VideoBackground/VideoContainer';
import Header from "../components/Header/header";
import MusicPanel from "../components/MusicPanel/MusicPanel";

interface RouteParams {
    platform: string;
    videoId: string;
}

const MusicPlayer: FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Get the platform and videoId parameters from the URL
    const { id } = useParams();

    console.log("Video ID:", id);

    return (
        <div>
            <VideoContainer id={id}/>
            <Header />
            <MusicPanel />
        </div>
    );
};

export default MusicPlayer;
