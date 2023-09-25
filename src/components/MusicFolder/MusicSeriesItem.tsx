import { ListItem, ListItemText, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface MusicSeriesItemProps {
    data: {
        title: string;
        author: string;
        platform: string;
        videoId: string;
    };
}

const MusicSeriesItem: FC<MusicSeriesItemProps> = ({ data }) => {
    const linkPath = `/Music/MusicPlayer/${data.platform}/${data.videoId}`;

    return (
        <RouterLink to={linkPath} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
                <ListItemText
                    primary={<span style={{ fontSize: '14px' }}>{data.title}</span>}
                    secondary={
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span>{`Author: ${data.author}`}</span>
                            <span>{`Platform: ${data.platform}`}</span>
                        </div>
                    }
                />
            </ListItem>
        </RouterLink>
    );
}

export default MusicSeriesItem;
