import {IconButton, ListItem, ListItemText, TextField} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";

interface MusicSeriesItemProps {
    data: {
        title: string;
        author: string;
        platform: string;
        videoId: string;
    };
    onDelete: (videoId: string) => void;  // New prop for delete function
    isEditable: boolean;  // New prop to check if editing is enabled
}

const MusicSeriesItem: FC<MusicSeriesItemProps> = ({ data, onDelete, isEditable }) => {
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
                {isEditable && (
                    <IconButton onClick={(e) => {
                        e.preventDefault();  // Prevent navigation
                        onDelete(data["_id"]);
                    }}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </ListItem>
        </RouterLink>
    );
}

export default MusicSeriesItem;
